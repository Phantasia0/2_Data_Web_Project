import React, { useEffect } from "react";
import { List } from "@mui/material";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { useGetUserCommentQuery } from "../../services/profileApi";
import FeedCard from "../Community/FeedCard";

const CommentList = () => {
  const user = useSelector(selectCurrentUser);

  const {
    data: commentData,
    isSuccess: commentSuccess,
    isError: commentError,
    isLoading: commentLoading,
    refetch,
    // @ts-ignore
  } = useGetUserCommentQuery(
    {
      // @ts-ignore
      _id: user?._id,
      page: 1,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {commentSuccess &&
        commentData?.posts?.map((item: any) => (
          <Comment key={item?.comments?._id} data={item} refetch={refetch} />
        ))}
    </List>
  );
};

export default CommentList;
