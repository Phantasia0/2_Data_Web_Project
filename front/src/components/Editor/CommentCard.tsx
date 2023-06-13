// @ts-nocheck

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { deleteThisFeed } from "../../features/SocialReducer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import Button from "@mui/material/Button";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../services/commentApi";
import { useParams } from "react-router-dom";

const CommentCard = ({
  data,
  refetch,
  setSnackbarOpen,
  setSnackbarMessage,
}: any) => {
  const user = useSelector(selectCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");
  const { feedId } = useParams();

  const [updateComment, { data: updatedData }] = useUpdateCommentMutation();
  const [deleteComment, { data: deletedData }] = useDeleteCommentMutation();

  const handleMenuOpen = (event: any) => {
    setMenuOpen(true);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    refetch();
    setContent(data?.content);
    handleMenuClose();
  };

  const handleCommentChange = (e: any) => {
    setContent(e.currentTarget.value);
  };

  const handleClickSubmit = async (e: any) => {
    e.preventDefault();
    await updateComment({
      post_id: feedId,
      _id: data._id,
      body: {
        content: content,
      },
    });

    refetch();
    setIsEdit(false);
    setSnackbarOpen(true);
    setSnackbarMessage("댓글이 수정되었습니다.");
  };

  const handleClickCancel = (e: any) => {
    setIsEdit(false);
  };

  const handleDelete = async () => {
    await deleteComment({
      post_id: feedId,
      _id: data._id,
    });
    refetch();

    handleMenuClose();
    setSnackbarOpen(true);
    setSnackbarMessage("댓글이 삭제되었습니다.");
  };

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "lightgray",
        height: "auto",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ backgroundColor: "primary.main" }}>R</Avatar>}
        title={data?.user?.nickname}
        subheader={data?.updatedAt.slice(0, 10)}
        action={
          <IconButton
            onClick={handleMenuOpen}
            disabled={data?.user?._id !== (user?._id as string)}
          >
            {data.user._id === user?._id && <MoreVert />}
          </IconButton>
        }
      />
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleEdit}>수정</MenuItem>
        <MenuItem onClick={handleDelete}>삭제</MenuItem>
      </Menu>
      {!isEdit ? (
        <CardContent>
          <Typography>{data?.content}</Typography>
        </CardContent>
      ) : (
        <Box>
          <FormControl fullWidth>
            <InputBase
              onChange={handleCommentChange}
              value={content}
              multiline
              rows={2.2}
              fullWidth
              sx={{
                border: "1px solid",
                borderRadius: "4px",
                p: 1,
              }}
            />
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Button
                onClick={handleClickSubmit}
                type="submit"
                variant="contained"
                sx={{
                  marginTop: "3px",
                  borderRadius: "4px",
                  height: "100%",
                  width: "10%",
                  color: "white",
                }}
              >
                수정
              </Button>
              <Button
                onClick={handleClickCancel}
                color="error"
                variant="contained"
                sx={{
                  marginTop: "3px",
                  borderRadius: "4px",
                  height: "100%",
                  width: "10%",
                  color: "white",
                }}
              >
                취소
              </Button>
            </Box>
          </FormControl>
        </Box>
      )}
    </Card>
  );
};

export default CommentCard;
