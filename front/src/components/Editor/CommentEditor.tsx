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

const CommentEditor = ({ refetch }: any) => {
  const { feedId } = useParams();
  const [content, setContent] = useState<any>(null);

  const [addComment, { data: addData, isSuccess, isError }] =
    useAddCommentMutation();

  const handleCommentChange = (e: any) => {
    setContent(e.currentTarget.value);
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    setContent(e.currentTarget.value);
    if (content.length > 0) {
      await addComment({
        _id: feedId,
        body: {
          content: content,
        },
      });
    }

    refetch();
  };

  return (
    <Grid sx={{ width: "25%", minWidth: "600px" }}>
      <Grid>
        <FormControl fullWidth>
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
              marginTop: "3px",
              borderRadius: "4px",
              height: "100%",
              width: "10%",
              color: "white",
            }}
            onClick={handleClick}
          >
            등록
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CommentEditor;
