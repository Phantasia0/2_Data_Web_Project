import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import { Grid, Snackbar } from "@mui/material";
import { getAllFeed } from "../../features/SocialReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { SKIPCOUNT } from "../../utils/validate";

const FeedGrid = ({
  data,
  isSuccess,
  currentPage,
  isFetching,
  refetch,
}: any) => {
  const dispatch = useDispatch();
  const { feeds, total } = useSelector(({ social }: RootState) => ({
    feeds: social.feeds,
    total: social.total,
  }));

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<any>("");
  const [snackbarColor, setSnackbarColor] = useState<any>("primary.main");

  useEffect(() => {
    if (isSuccess && currentPage <= Math.floor(data.total / SKIPCOUNT) + 1) {
      if (!isFetching) {
        dispatch(
          getAllFeed({
            total: data?.total,
            feeds: data?.post,
          })
        );
      }
    }
  }, [isSuccess, currentPage, isFetching, data?.post]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (snackbarOpen) {
      refetch();
    }
  }, [snackbarOpen]);

  if (!data) {
    return <div>Empty</div>;
  }

  return (
    <Grid container>
      {feeds?.map((feed: any) => (
        <Grid item key={feed?._id} xs={12} sm={12} md={6} lg={6} xl={3}>
          <FeedCard
            data={feed}
            key={feed?._id}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarColor={setSnackbarColor}
          />
        </Grid>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          sx: { backgroundColor: snackbarColor },
        }}
      />
    </Grid>
  );
};

export default FeedGrid;
