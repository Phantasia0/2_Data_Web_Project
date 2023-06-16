// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import LabelCommunity from "./LabelCommunity";
import { fontdesign } from "../../theme/fontdesign";

import { useGetSocialDataQuery } from "../../services/socialApi";

import { useSelector, useDispatch } from "react-redux";
import { goNext, resetCurrentPage } from "../../features/SocialReducer";
import { RootState } from "../../features/configureStore";
import FeedGrid from "./FeedGrid";
import { selectCurrentUser } from "../../features/AuthReducer";
import { debounce } from "lodash";
import { SKIPCOUNT } from "../../utils/validate";
import LoadingImage from "../common/Loading";
import Navbar from "./Navbar";

const Community = () => {
  const dispatch = useDispatch();
  const { total, currentPage } = useSelector(({ social }: RootState) => ({
    total: social.total,
    currentPage: social.currentPage,
  }));

  const user = useSelector(selectCurrentUser);

  const { data, isSuccess, isError, isLoading, isFetching, refetch } =
    useGetSocialDataQuery(currentPage, {
      skip: currentPage > Math.floor((total as number) / SKIPCOUNT) + 1,
      refetchOnMountOrArgChange: true,
    });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const triggerPosition = scrollHeight - clientHeight - 1;
    if (scrollTop >= triggerPosition) {
      dispatch(goNext(1));
      const scrollY = window.innerHeight + window.scrollY - 50;
      window.scrollTo({ top: scrollY });
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    if (currentPage > Math.floor((total as number) / SKIPCOUNT) + 1) {
      return;
    }
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, []);

  if (isError) {
    return null;
  }
  if (isLoading) {
    return <LoadingImage />;
  }
  return (
    <div
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <Navbar /> */}
      {/* <div>
        <Typography sx={fontdesign.xsTitle} style={{ marginTop: "4vw" }}>
          Story
        </Typography>
      </div> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "row",
          width: "100%",
          marginTop: "0rem",
        }}
      >
        <Box
          flex={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "50vw",
            marginTop: "2vw",
          }}
        >
          {user && <LabelCommunity label={"새 글 작성"} />}
        </Box>
      </Box>
      <Grid
        container
        justifyContent="center"
        mt={2}
        sx={{ margin: "auto", width: "80%" }}
      >
        {data && (
          <FeedGrid
            data={data}
            isSuccess={isSuccess}
            currentPage={currentPage}
            isFetching={isFetching}
            refetch={refetch}
          />
        )}
      </Grid>
    </div>
  );
};

export default Community;
