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
import Rightbar from "./Rightbar";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

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

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<any>("");
  const [snackbarColor, setSnackbarColor] = useState<any>("primary.main");

  const { data, isSuccess, isLoading, isError, refetch } = useGetFeedQuery(
    feedId as string
  );
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      if (user?._id === data?.user?._id) {
        setIsOwner(true);
      }
    }
  }, [isSuccess]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <LoadingImage />;
  }

  const whatToDisplay = () => {
    if (data?.restaurant || data?.park) {
      return (
        <>
          {width >= 768 && (
            <Box sx={{ flex: "1.7" }}>
              <Rightbar data={data} />
            </Box>
          )}
          {width < 768 && (
            <Box sx={{ flex: "3" }}>
              <Rightbar data={data} />
            </Box>
          )}
        </>
      );
    } else {
      return;
    }
  };

  return (
    <Box
      // sx={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   gap: "2rem",
      // }}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {(data?.park || data?.restaurant) && <Box sx={{ flex: "1" }} />}
      <Box sx={{ flex: "3", maxWidth: "800px" }}>
        <FeedCard
          data={data}
          isOwner={isOwner}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarColor={setSnackbarColor}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/*<CommentEditor />*/}
          <CommentList
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarColor={setSnackbarColor}
          />
        </Box>
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
      {whatToDisplay()}
    </Box>
  );
};

export default FeedDetail;
