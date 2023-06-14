// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFeedQuery } from "../../services/socialApi";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import MUIRichTextEditor from "mui-rte";
import { Box, Button, Snackbar } from "@mui/material";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { useUpdateFeedMutation } from "../../services/feedApi";
import { updateThisFeed } from "../../features/SocialReducer";
import { Comment } from "@mui/icons-material";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import FeedCard from "./FeedCard";
import LoadingImage from "../common/Loading";

export const LoadDetail = (text: any) => {
  const contentHTML = convertFromHTML(text);
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  );
  return JSON.stringify(convertToRaw(state));
};

const FeedDetail = () => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { feedId } = useParams();
  const user = useSelector(selectCurrentUser);
  // const rteRef = useRef(null);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<any>("");
  const [snackbarColor, setSnackbarColor] = useState<any>("primary.main");

  const { data, isSuccess, isLoading, isError, refetch } = useGetFeedQuery(
    feedId as string
  );

  // const [
  //   updateFeed,
  //   {
  //     data: updateFeedData,
  //     isSuccess: updateFeedSuccess,
  //     isError: updateFeedError,
  //   },
  // ] = useUpdateFeedMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      if (user?._id === data?.user?._id) {
        setIsOwner(true);
      }
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (formState === "register" && snackbarOpen) {
  //     setFormState("login");
  //     setPrevState("register");
  //   }

  //   if (prevState === "register") {
  //     setTimeout(() => {
  //       setPrevState("login");
  //     }, 2000);
  //   }
  // }, [snackbarOpen]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const save = (story: string) => {
  //   if (story !== "") {
  //     updateFeed({
  //       _id: feedId,
  //       body: {
  //         content: story,
  //       },
  //     });
  //     dispatch(
  //       updateThisFeed({
  //         _id: feedId,
  //         content: story,
  //       })
  //     );
  //     navigate("/community", { replace: true });
  //   }
  // };
  // const handleClickUpdate = (e: any) => {
  //   // @ts-ignore
  //   rteRef?.current?.save();
  // };

  if (isLoading) {
    return <LoadingImage />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <FeedCard
        data={data}
        isOwner={isOwner}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarColor={setSnackbarColor}
      />
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
          marginBottom: "1rem",
          height: "600px",
          maxHeight: "600px",
          width: "100%",
        }}
      >
        {isSuccess && (
          <MuiThemeProvider theme={theme}>
            <MUIRichTextEditor
              ref={rteRef}
              defaultValue={data?.content}
              readOnly={!isOwner}
              onSave={save}
            />
          </MuiThemeProvider>
        )}
      </Box> */}
      {/* {isOwner && (
        <Box sx={{ marginTop: "1rem" }}>
          <Button
            onClick={handleClickUpdate}
            variant="contained"
            sx={{ height: "auto", color: "white" }}
          >
            Update
          </Button>
        </Box>
      )} */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/*<CommentEditor />*/}
        <CommentList
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          sx: { backgroundColor: snackbarColor },
        }}
      />
    </Box>
  );
};

export default FeedDetail;
