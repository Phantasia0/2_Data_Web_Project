// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Typography, Button, Link, Box, Grid } from "@mui/material";
import LabelCommunity from "./LabelCommunity";
import FeedCard from "./FeedCard";

import { useGetSocialDataQuery } from "../../services/socialApi";

import { useSelector, useDispatch } from "react-redux";
import { getAllFeed, goNext } from "../../features/SocialReducer";
import { RootState } from "../../features/configureStore";
import FeedGrid from "./FeedGrid";
import { selectCurrentUser } from "../../features/AuthReducer";
import { debounce } from "lodash";

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
      skip: currentPage > Math.floor((total as number) / 4) + 1,
      refetchOnArgChange: true,
    });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const triggerPosition = scrollHeight - clientHeight - 1;

    if (scrollTop >= triggerPosition) {
      dispatch(goNext(1));
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    if (currentPage > Math.floor((total as number) / 4) + 1) {
      return;
    }
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentPage >= Math.floor((total as number) / 4) + 1) {
      return;
    }
    const scrollToPosition = () => {
      const scrollY = window.innerHeight + window.scrollY - 1;
      window.scrollTo({ top: scrollY });
    };

    const handleScroll = () => {
      if (window.scrollY === 0) {
        scrollToPosition();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSuccess, currentPage]);

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
      <div
        className="home-first"
        style={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={require("../../assets/images/flowers.jpg")}
          alt="Home Image"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "14%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(30px, 2vw, 40px)",
                sm: "clamp(30px, 2vw, 40px)",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginTop: "10px",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "secondary.main",
              whiteSpace: "nowrap",
              fontFamily: "NanumSquareExtraBold, sans-serif",
            }}
          >
            여러분의
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(30px, 2vw, 40px)",
                sm: "clamp(30px, 2vw, 40px)",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginBottom: "10px",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "secondary.main",
              whiteSpace: "nowrap",
              fontFamily: "NanumSquareExtraBold, sans-serif",
            }}
          >
            스토리
          </Typography>
        </div>
      </div>
      <div>
        <Typography
          sx={{
            fontSize: {
              xs: "clamp(15px, 2vw, 30px)",
              sm: "clamp(15px, 2vw, 30px)",
            },
            lineHeight: { xs: "1.2", sm: "1.5" },
            color: "primary.main",
            whiteSpace: "nowrap",
            marginTop: "10rem",
            fontFamily: "NanumSquareExtraBold, sans-serif",
          }}
        >
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
          marginTop: "3rem",
        }}
      >
        <Box
          flex={3}
          sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
        >
          {category.map((item) => (
            <LabelCommunity label={item} />
          ))}
        </Box>
        <Box flex={2}>{user && <LabelCommunity label={"새 글 작성"} />}</Box>
      </Box>
      <Grid
        container
        justifyContent="center"
        mt={2}
        sx={{ margin: "auto", width: "80%" }}
      >
        {isSuccess && (
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
