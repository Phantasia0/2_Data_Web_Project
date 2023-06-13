import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import { Grid, Snackbar } from "@mui/material";
import { getAllFeed } from "../../features/SocialReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { SKIPCOUNT } from "../../utils/validate";

const FeedGrid = ({ data, isSuccess, currentPage, isFetching }: any) => {
  const dispatch = useDispatch();
  const { feeds, total } = useSelector(({ social }: RootState) => ({
    feeds: social.feeds,
    total: social.total,
  }));

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);

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

  if (!data) {
    return <div>Empty</div>;
  }

  return (
    <Grid container sx={{ display: "flex", justifyContent: "flex-start" }}>
      {feeds?.map((feed: any) => (
        <FeedCard
          data={feed}
          key={feed?._id}
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
    </Grid>
  );
};

export default FeedGrid;
