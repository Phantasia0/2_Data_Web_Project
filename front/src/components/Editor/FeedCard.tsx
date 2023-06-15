// @ts-nocheck
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Comment,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { useDeleteFeedMutation } from "../../services/feedApi";
import { useDispatch } from "react-redux";
import { deleteThisFeed } from "../../features/SocialReducer";
import { useUpdateLikeMutation } from "../../services/likeApi";
import { useGetFeedQuery } from "../../services/socialApi";
import MUIRichTextEditor from "mui-rte";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/theme";
import { useUpdateFeedMutation } from "../../services/feedApi";
import { updateThisFeed } from "../../features/SocialReducer";
import LoadingImage from "../common/Loading";

const sampleURL = {
  url: "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};
const FeedCard: FC<any> = ({
  data,
  isOwner,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarColor,
}) => {
  // const [analyzedData, setAnalyzedData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(data?.likeCheck);

  // console.log(data);
  const dispatch = useDispatch();
  const rteRef = useRef(null);

  const [
    updateFeed,
    {
      data: updateFeedData,
      isSuccess: updateFeedSuccess,
      isError: updateFeedError,
    },
  ] = useUpdateFeedMutation();

  const save = (story: any) => {
    const parsedData = JSON.parse(story);
    const text =
      parsedData?.blocks[0]?.text.length > 20
        ? `${parsedData?.blocks[0]?.text.slice(0, 20)}...`
        : parsedData?.blocks[0]?.text;
    const content = text.replace(/\s/g, "");
    if (!content) {
      setSnackbarColor("orange");
      setSnackbarOpen(true);
      setSnackbarMessage("내용을 입력해주세요.");
      return;
    }

    updateFeed({
      _id: data?._id,
      body: {
        content: story,
      },
    });
    dispatch(
      updateThisFeed({
        _id: data?._id,
        content: story,
      })
    );
    setSnackbarColor("primary.main");
    setSnackbarOpen(true);
    setSnackbarMessage("게시글이 수정되었습니다.");
    // navigate("/community/f", { replace: true });
    // navigate(-1, { replace: false });
  };

  const handleClickUpdate = (e: any) => {
    // @ts-ignore
    rteRef?.current?.save();
  };

  const [
    deleteFeed,
    {
      data: deleteFeedData,
      isSuccess: deleteFeedSuccess,
      isError: deleteFeedError,
    },
  ] = useDeleteFeedMutation();

  const [updateLike, { data: updatedLikeData }] = useUpdateLikeMutation();
  const {
    data: thisFeedData,
    isSuccess: thisFeedSuccess,
    isError: thisFeedError,
    refetch: thisFeedRefetch,
  } = useGetFeedQuery(data._id);

  const handleMenuOpen = (event: any) => {
    setMenuOpen(true);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleDelete = async () => {
    await deleteFeed({
      _id: data?._id,
    });
    dispatch(deleteThisFeed(data?._id));

    navigate("/community");
  };

  const handleClickLike = async (e: any) => {
    if (!user) {
      setSnackbarColor("orange");
      setSnackbarOpen(true);
      setSnackbarMessage("로그인 한 회원만 누를 수 있습니다.");
      return;
    }

    await updateLike({
      _id: data?._id,
    });
    thisFeedRefetch();

    setIsLiked(!isLiked);
  };

  // const analyzingData = (data: any) => {
  //   const parsedData = JSON.parse(data?.content);
  //   let url = null;
  //   // console.log(parsedData);
  //
  //   if (Object.keys(parsedData.entityMap).length > 0) {
  //     const entityKeys = Object.keys(parsedData.entityMap);
  //     const imageEntities = entityKeys
  //       .map((key) => parsedData.entityMap[key])
  //       .filter((entity) => entity.type === "IMAGE");
  //
  //     if (imageEntities.length > 0) {
  //       const firstImageEntity = imageEntities[0];
  //       const entityData = firstImageEntity.data;
  //
  //       url = entityData.url;
  //       const width = entityData.width;
  //       const height = entityData.height;
  //     } else {
  //       url = sampleURL.url;
  //     }
  //   } else {
  //     url = sampleURL.url;
  //   }
  //
  //   const text =
  //     parsedData?.blocks[0]?.text.length > 20
  //       ? `${parsedData?.blocks[0]?.text.slice(0, 20)}...`
  //       : parsedData?.blocks[0]?.text;
  //
  //   const newData = {
  //     text: text,
  //     image: url,
  //   };
  //   setAnalyzedData(newData);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   analyzingData(data);
  // }, []);

  if (loading) {
    return <LoadingImage />;
  }

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card
        sx={{
          margin: 5,
          border: "1px solid",
          borderColor: "lightgray",
          height: "auto",
        }}
      >
        <CardHeader
          title={thisFeedData?.user?.nickname}
          avatar={
            <Avatar
              sx={{ width: 50, height: 50 }}
              src={`http://localhost:5001/profile/${thisFeedData?.user?.profile}`}
            />
          }
          action={
            <IconButton onClick={handleMenuOpen} disabled={!isOwner}>
              {thisFeedData?.user?._id === (user?._id as string) && (
                <MoreVert />
              )}
            </IconButton>
          }
          subheader={data.updatedAt.slice(0, 10)}
        />
        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        </Menu>

        <MuiThemeProvider theme={theme}>
          <MUIRichTextEditor
            ref={rteRef}
            defaultValue={data?.content}
            readOnly={!isOwner}
            onSave={save}
            toolbar={isOwner}
          />
        </MuiThemeProvider>
        {isOwner && (
          <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
            <Button
              onClick={handleClickUpdate}
              variant="contained"
              sx={{ height: "auto", color: "white" }}
            >
              Update
            </Button>
          </Box>
        )}
        <CardContent
          sx={{
            height: "1px",
            display: "flex",
          }}
        >
          <IconButton sx={{ height: "1rem" }} onClick={handleClickLike}>
            <Checkbox
              icon={<FavoriteBorder sx={{ fontSize: "1rem" }} />}
              checkedIcon={<Favorite sx={{ color: "red", fontSize: "1rem" }} />}
              checked={isLiked}
            />
          </IconButton>
          <Box sx={{ fontSize: "0.7rem", marginRight: "0.5rem" }}>
            {thisFeedData?.likes?.filter((item) => item.value === 1).length}
          </Box>

          <IconButton sx={{ height: "1rem", marginRight: "0.5rem" }}>
            <Comment sx={{ fontSize: "1rem" }} />
          </IconButton>
          <Box sx={{ fontSize: "0.7rem" }}> {data?.comments.length || 0}</Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default FeedCard;
