import React, { useRef } from "react";
import MUIRichTextEditor from "mui-rte";
import { Box, Button } from "@mui/material";
import { useAddFeedMutation } from "../../services/feedApi";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { replace } from "lodash";

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
  const [
    addFeed,
    { data: addFeedData, isSuccess: addFeedSuccess, isError: addFeedError },
  ] = useAddFeedMutation();

  const save = async (story: string) => {
    if (story !== "") {
      addFeed({
        content: story,
      });
      navigate("/community");
      window.location.reload();
    }
  };

  const handleClickPost = (e: any) => {
    // @ts-ignore
    rteRef?.current?.save();

    navigate("/community");
    window.location.reload();
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
    </Box>
  );
};

export default FeedEditor;
