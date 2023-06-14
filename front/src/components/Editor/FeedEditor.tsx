import React, { useRef, useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { Box, Button, Snackbar } from "@mui/material";
import { useAddFeedMutation } from "../../services/feedApi";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { replace } from "lodash";
import { useDispatch } from "react-redux";
import { resetCurrentPage, addThisFeed } from "../../features/SocialReducer";

const MyHashTagDecorator = (props: any) => {
  return (
    <span
      style={{
        color: "#3F51B5",
      }}
    >
      {props.children}
    </span>
  );
};

const MyAtDecorator = (props: any) => {
  const customUrl = "http://myulr/mention/" + props.decoratedText;
  return (
    <a
      onClick={() => (window.location.href = customUrl)}
      style={{
        color: "green",
        cursor: "pointer",
      }}
    >
      {props.children}
    </a>
  );
};

const FeedEditor = () => {
  const rteRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    addFeed,
    { data: addFeedData, isSuccess: addFeedSuccess, isError: addFeedError },
  ] = useAddFeedMutation();

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);

  const save = async (story: string) => {
    const parsedData = JSON.parse(story);
    const text =
      parsedData?.blocks[0]?.text.length > 20
        ? `${parsedData?.blocks[0]?.text.slice(0, 20)}...`
        : parsedData?.blocks[0]?.text;
    const content = text.replace(/\s/g, "");
    if (!content) {
      setSnackbarOpen(true);
      return;
    }

    if (story !== "") {
      dispatch(resetCurrentPage(0));

      const success = await addFeed({
        content: story,
      }).unwrap();

      if (success) {
        // console.log(success);
        dispatch(addThisFeed(success));
        navigate("/community");
      }
      console.log("success", success);
    }
  };

  const handleClickPost = (e: any) => {
    // @ts-ignore
    rteRef?.current?.save();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Box
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
        <MuiThemeProvider theme={theme}>
          <MUIRichTextEditor
            ref={rteRef}
            label="당신의 스토리를 써주세요"
            onSave={save}
            decorators={[
              {
                component: MyHashTagDecorator,
                regex: /\#[\w]+/g,
              },
              {
                component: MyAtDecorator,
                regex: /\@[\w]+/g,
              },
            ]}
          />
        </MuiThemeProvider>
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <Button
          onClick={handleClickPost}
          variant="contained"
          sx={{ height: "auto", color: "white" }}
        >
          POST
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="내용을 입력해주세요."
        ContentProps={{
          sx: { backgroundColor: "orange" },
        }}
      />
    </Box>
  );
};

export default FeedEditor;
