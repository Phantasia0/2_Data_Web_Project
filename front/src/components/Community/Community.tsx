// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Typography, Button, Link, Box, Grid } from "@mui/material";
import LabelCommunity from "./LabelCommunity";
import FeedCard from "./FeedCard";
import { fontdesign } from "../../theme/fontdesign";

import { useGetSocialDataQuery } from "../../services/socialApi";

import { useSelector, useDispatch } from "react-redux";
import { getAllFeed, goNext } from "../../features/SocialReducer";
import { RootState } from "../../features/configureStore";
import FeedGrid from "./FeedGrid";
import { selectCurrentUser } from "../../features/AuthReducer";
import { debounce } from "lodash";
import { SKIPCOUNT } from "../../utils/validate";

const category = ["친환경", "비건", "기타"];

const Community = () => {
  const dispatch = useDispatch();
  const { feeds, total, currentPage } = useSelector(
    ({ social }: RootState) => ({
      feeds: social.feeds,
      total: social.total,
      currentPage: social.currentPage,
    })
  );

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
    // if (scrollTop === 0) {
    //   const scrollY = 1; // 스크롤 위치를 1px 아래로 유지
    //   window.scrollTo({ top: scrollY });
    // }
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

  // useEffect(() => {
  //   // const scrollToPosition = () => {
  //   //   const scrollY = window.innerHeight + window.scrollY - 50;
  //   //   window.scrollTo({ top: scrollY });
  //   // };

  //   const handleScroll = () => {
  //     // if (window.scrollY === 0) {
  //     //   scrollToPosition();
  //     // }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isSuccess, currentPage]);

  if (isError) {
    return null;
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
      <div>
        <Typography sx={fontdesign.xsTitle} style={{ marginTop: "4vw" }}>
          Story
        </Typography>
      </div>
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
          />
        )}
      </Grid>
    </div>
  );
};

export default Community;
