import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Grid,
  FormControl,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAddCommentMutation } from "../../services/commentApi";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../features/AuthReducer";
import { useSelector } from "react-redux";
import { fontdesign } from "../../theme/fontdesign";

const CommentEditor = ({
  refetch,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarColor,
}: any) => {
  const { feedId } = useParams();
  const [content, setContent] = useState<any>(null);

  const user = useSelector(selectCurrentUser);

  const [addComment, { data: addData, isSuccess, isError }] =
    useAddCommentMutation();

  const handleCommentChange = (e: any) => {
    setContent(e.currentTarget.value);
  };
  const handleClick = async (e: any) => {
    if (!content) {
      setSnackbarOpen(true);
      setSnackbarColor("orange");
      setSnackbarMessage("댓글을 입력해주세요.");
      return;
    }
    e.preventDefault();
    setContent(e.currentTarget.value);
    if (content && content.length > 0) {
      await addComment({
        _id: feedId,
        body: {
          content: content,
        },
      });
      await refetch();
      setSnackbarOpen(true);
      setSnackbarColor("primary.main");
      setSnackbarMessage("댓글이 작성되었습니다.");
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        borderColor: "lightgray",
        height: "auto",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      {user ? (
        <FormControl
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <InputBase
            onChange={handleCommentChange}
            value={content}
            placeholder="의견 남기기"
            multiline
            rows={2.2}
            fullWidth
            sx={{
              border: "1px solid",
              borderRadius: "4px",
              p: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "4px",
              borderRadius: "4px",
              height: "100%",
              width: "10%",
              color: "white",
              marginBottom: "2px",
            }}
            onClick={handleClick}
          >
            등록
          </Button>
        </FormControl>
      ) : (
        <Grid sx={{ textAlign: "center" }}>
          <Typography sx={fontdesign.xsText}>
            로그인하면 댓글을 달 수 있어요.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CommentEditor;
