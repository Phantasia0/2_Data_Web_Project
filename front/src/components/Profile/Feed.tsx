import { Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeedCard from "../Community/FeedCard";

import { useGetUserFeedQuery } from "../../services/profileApi";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { RootState } from "../../features/configureStore";

import {
  resetData,
  setTotal,
  updateCommentList,
} from "../../features/ProfileReducer";
import { useGetNicknameDataQuery } from "../../services/socialApi";

const Feed = () => {
  const user = useSelector(selectCurrentUser);
  const { pageNumber, keyword, filtered } = useSelector(
    ({ profile }: RootState) => ({
      pageNumber: profile.pageNumber,
      keyword: profile.keyword,
      filtered: profile.filtered,
    })
  );
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);

  const {
    data: feedData,
    isSuccess: feedSuccess,
    isError: feedError,
    isLoading: feedLoading,
    isFetching: feedFetching,
    refetch,
  } = useGetUserFeedQuery(
    {
      // @ts-ignore
      _id: user?._id,
      page: pageNumber,
    },
    {
      skip: filtered,
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: searchData,
    isSuccess: searchSuccess,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useGetNicknameDataQuery(keyword, {
    skip: !filtered,
  });

  useEffect(() => {
    if (!keyword) {
      dispatch(resetData());
    }
  }, [keyword]);

  useEffect(() => {
    if (feedSuccess) {
      dispatch(setTotal(feedData?.tot));
    }
  }, [feedSuccess]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (snackbarOpen) {
      refetch();
      dispatch(updateCommentList());
    }
  }, [snackbarOpen]);

  if (feedFetching) {
    return null;
  }

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {!filtered &&
        feedData?.post?.map((item: any) => (
          <FeedCard
            key={item?._id}
            data={item}
            setSnackbarOpen={setSnackbarOpen}
          />
        ))}
      {filtered &&
        searchData?.post?.map((item: any) => (
          <FeedCard
            key={item?._id}
            data={item}
            setSnackbarOpen={setSnackbarOpen}
          />
        ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={"게시글이 삭제되었습니다."}
        ContentProps={{
          sx: { backgroundColor: "primary.main" },
        }}
      />
    </Box>
  );
};

export default Feed;
