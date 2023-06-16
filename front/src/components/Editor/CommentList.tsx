// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CommentCard from "./CommentCard";
import { useGetFeedQuery } from "../../services/socialApi";
import { useParams } from "react-router-dom";
import CommentEditor from "./CommentEditor";

const CommentList = ({
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarColor,
}) => {
  const { feedId } = useParams();
  const { data, isSuccess, isFetching, isLoading, isError, refetch } =
    useGetFeedQuery(feedId as string);

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setCommentList(data?.comments || []);
    }
  }, [isSuccess, data]);

  const handleCommentUpdate = () => {
    refetch();
  };

  return (
    <Box item xs={12} sm={12} md={6} lg={4} xl={3}>
      <CommentEditor
        refetch={refetch}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarColor={setSnackbarColor}
        data={data}
      />
      {commentList.map((item) => (
        <Box
          key={item?.user?._id}
          sx={{
            margin: 2,
            borderColor: "lightgray",
            height: "auto",
          }}
        >
          <CommentCard
            data={item}
            refetch={handleCommentUpdate}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarColor={setSnackbarColor}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
