// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CommentCard from "./CommentCard";
import { useGetFeedQuery } from "../../services/socialApi";
import { useParams } from "react-router-dom";
import CommentEditor from "./CommentEditor";

// const CommentList = () => {
//   const { feedId } = useParams();
//   const { data, isSuccess, isFetching, isLoading, isError, refetch } =
//     useGetFeedQuery(feedId as string);
//
//   const renderList = (data: any) => {
//     return data?.comments?.map((item: any) => (
//       <Box key={item?.user?._id}>
//         <CommentCard data={item} refetch={refetch} />
//       </Box>
//     ));
//   };
//
//   return (
//     <Box>
//       <CommentEditor refetch={refetch} />
//       {renderList(data)}
//     </Box>
//   );
// };
//
// export default CommentList;

const CommentList = ({ setSnackbarOpen, setSnackbarMessage }) => {
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
    <Box>
      <CommentEditor
        refetch={refetch}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
      />
      {commentList.map((item) => (
        <Box key={item?.user?._id}>
          <CommentCard
            data={item}
            refetch={handleCommentUpdate}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
