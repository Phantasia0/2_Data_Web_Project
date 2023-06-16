// @ts-nocheck
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Comment,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { useDeleteFeedMutation } from "../../services/feedApi";
import { useDispatch } from "react-redux";
import { deleteThisFeed } from "../../features/SocialReducer";
import { useUpdateLikeMutation } from "../../services/likeApi";
import { useGetFeedQuery } from "../../services/socialApi";
import { RootState } from "../../features/configureStore";
import LoadingImage from "../common/Loading";

const sampleURL = {
  url: "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

const FeedCard: FC<any> = ({
  data,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarColor,
}) => {
  const [analyzedData, setAnalyzedData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(Boolean(data?.likeCheck));
  const { keyword } = useSelector(
    ({ profile }): RootState => ({
      keyword: profile.keyword,
    })
  );

  const dispatch = useDispatch();
  const [
    deleteFeed,
    {
      data: deleteFeedData,
      isSuccess: deleteFeedSuccess,
      isError: deleteFeedError,
    },
  ] = useDeleteFeedMutation();

  useEffect(() => {
    setIsLiked(data?.likeCheck);
  }, [data?.likeCheck]);

  const [updateLike, { data: updatedLikeData }] = useUpdateLikeMutation();
  const {
    data: thisFeedData,
    isSuccess: thisFeedSuccess,
    isError: thisFeedError,
    refetch: thisFeedRefetch,
    isFetching: thisFeedFetching,
  } = useGetFeedQuery(data._id, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const { isModalVisible } = useSelector(({ profile }: RootState) => ({
    isModalVisible: profile.isModalVisible,
  }));

  // useEffect(() => {
  //   thisFeedRefetch();
  // }, []);

  useEffect(() => {
    // thisFeedRefetch();
    // setIsLiked(thisFeedData?.likeCheck);
    const refetchFeed = async () => {
      const success = await thisFeedRefetch().unwrap();
      if (success) {
        setIsLiked(thisFeedData?.likeCheck);
      }
    };
    refetchFeed();
  }, [isLiked]);

  const handleMenuOpen = (event: any) => {
    setMenuOpen(true);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleEdit = () => {
    navigate(`/community/feed/${data._id}`);

    handleMenuClose();
  };

  const handleDelete = async () => {
    if (keyword) {
      return;
    }
    await deleteFeed({
      _id: data?._id,
    });

    setSnackbarColor("primary.main");
    setSnackbarOpen(true);
    setSnackbarMessage("게시글이 삭제되었습니다.");

    dispatch(deleteThisFeed(data?._id));
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
    }).unwrap();

    const success = await thisFeedRefetch().unwrap();

    if (success) {
      setIsLiked(!isLiked);
    }
  };

  const analyzingData = (data: any) => {
    const parsedData = JSON.parse(data?.content);
    let url = null;
    if (Object.keys(parsedData.entityMap).length > 0) {
      const entityKeys = Object.keys(parsedData.entityMap);
      const imageEntities = entityKeys
        .map((key) => parsedData.entityMap[key])
        .filter((entity) => entity.type === "IMAGE");

      if (imageEntities.length > 0) {
        const firstImageEntity = imageEntities[0];
        const entityData = firstImageEntity.data;

        url = entityData.url;
        const width = entityData.width;
        const height = entityData.height;
      } else {
        url = sampleURL.url;
      }
    } else {
      url = sampleURL.url;
    }

    const text =
      parsedData?.blocks[0]?.text.length > 20
        ? `${parsedData?.blocks[0]?.text.slice(0, 20)}...`
        : parsedData?.blocks[0]?.text;

    const newData = {
      text: text,
      image: url,
    };
    setAnalyzedData(newData);
    setLoading(false);
  };

  useEffect(() => {
    analyzingData(data);
  }, []);

  useEffect(() => {
    thisFeedRefetch();
  }, [isModalVisible]);

  if (loading) {
    return <LoadingImage />;
  }

  return (
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
            src={`http://${window.location.hostname}:5001/profile/${thisFeedData?.user?.profile}`}
          />
        }
        action={
          <IconButton
            onClick={handleMenuOpen}
            disabled={thisFeedData?.user?._id !== (user?._id as string)}
          >
            {thisFeedData?.user?._id === (user?._id as string) && <MoreVert />}
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
        <MenuItem onClick={handleEdit}>수정</MenuItem>
        {!keyword && <MenuItem onClick={handleDelete}>삭제</MenuItem>}
      </Menu>
      <Link
        onClick={() => navigate(`/community/feed/${data._id}`)}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <CardMedia
          component="img"
          image={analyzedData?.image}
          alt="image"
          sx={{
            width: "100%",
            height: 0,
            paddingTop: "calc(300/400 * 100%)",
            background: `url('${analyzedData?.image}') center center / cover no-repeat`,
          }}
        />
      </Link>
      <Typography variant="body2" color="text.secondary">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {analyzedData?.text}
        </Box>
      </Typography>
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
            disabled={!user}
          />
        </IconButton>
        <Box sx={{ fontSize: "0.7rem", marginRight: "0.5rem" }}>
          {thisFeedData?.likes?.filter((item) => item.value === 1).length}
        </Box>

        <IconButton sx={{ height: "1rem", marginRight: "0.5rem" }}>
          <Comment sx={{ fontSize: "1rem" }} />
        </IconButton>
        <Box sx={{ fontSize: "0.7rem" }}> {data.commentCount || 0}</Box>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
