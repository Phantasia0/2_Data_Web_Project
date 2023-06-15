import { Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeedCard from "../Community/FeedCard";

import { useGetUserFeedQuery } from "../../services/profileApi";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { RootState } from "../../features/configureStore";
import { fontdesign } from "../../theme/fontdesign";

import {
  resetData,
  resetPage,
  setTotal,
  updateCommentList,
} from "../../features/ProfileReducer";
import { useGetNicknameDataQuery } from "../../services/socialApi";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { pageNumber, keyword, filtered, isModalVisible } = useSelector(
    ({ profile }: RootState) => ({
      pageNumber: profile.pageNumber,
      keyword: profile.keyword,
      filtered: profile.filtered,
      isModalVisible: profile.isModalVisible,
    })
  );
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<any>("");
  const [snackbarColor, setSnackbarColor] = useState<any>("primary.main");

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
  } = useGetNicknameDataQuery(
    {
      // @ts-ignore
      nickname: keyword,
      page: pageNumber,
    },
    {
      skip: !filtered,
    }
  );

  useEffect(() => {
    dispatch(resetData());
  }, []);

  useEffect(() => {
    dispatch(resetPage());
  }, [keyword]);

  useEffect(() => {
    if (!keyword) {
      dispatch(resetData());
    }
  }, [keyword]);

  useEffect(() => {
    if (feedSuccess && !feedFetching) {
      dispatch(setTotal(feedData?.total));
    }
  }, [feedSuccess, feedFetching]);

  useEffect(() => {
    if (searchSuccess && !searchFetching) {
      dispatch(setTotal(searchData?.total));
    }
  }, [searchSuccess, searchFetching]);

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
    <Box flex={4} p={{ xs: 0, sm: 4, md: 4, lg: 8 }}>
      <Button
        sx={{
          marginLeft: "30vw",
          borderRadius: "20px",
          backgroundColor: "primary.main",
          color: "white",
          fontSize: "20px",
          p: 0,
          "&:hover": {
            backgroundColor: "green",
            color: "white",
          },
        }}
        onClick={() => navigate("/editor/new")}
      >
        +
      </Button>

      {!filtered ? (
        feedData?.post.length ? (
          feedData?.post?.map((item: any) => (
            <FeedCard
              key={item?._id}
              data={item}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarColor={setSnackbarColor}
            />
          ))
        ) : (
          <Grid sx={{ textAlign: "center" }}>
            <Typography sx={fontdesign.xsText}>
              게시글이 없습니다. 첫 게시글을 작성하세요!
            </Typography>
          </Grid>
        )
      ) : searchData?.post.length ? (
        searchData?.post?.map((item: any) => (
          <FeedCard
            key={item?._id}
            data={item}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarColor={setSnackbarColor}
          />
        ))
      ) : (
        <Grid sx={{ textAlign: "center" }}>
          <Typography sx={fontdesign.xsText}>
            검색된 회원의 피드가 없습니다.
          </Typography>
        </Grid>
      )}
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
