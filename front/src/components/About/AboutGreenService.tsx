import React from "react";
import { Typography, Button, Link } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Carousel from "./Carousel";

const AboutGreenService = () => {
  const { width } = useWindowDimensions();

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
                marginTop :'10px'
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "secondary.main",
              whiteSpace: "nowrap",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            그린라이프,
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(30px, 2vw, 40px)",
                sm: "clamp(30px, 2vw, 40px)",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginBottom :'10px'
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "secondary.main",
              whiteSpace: "nowrap",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            서비스
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
            fontFamily: "NanumSquareExtraBold, sans-serif"
          }}
        >
          서비스 소개
        </Typography>
      </div>
      <div>
        <Typography
          sx={{
            fontSize: {
              xs: "clamp(10px, 2vw, 20px)",
              sm: "clamp(10px, 2vw, 20px)",
            },
            lineHeight: { xs: "1.2", sm: "1.5" },
            color: "info.main",
            whiteSpace: "wrap",
            marginTop: "2rem",
            fontWeight: "bold"
          }}
        >
          <center>
            온실가스의 배출량을 줄일 수 있도록 일상에서 작은 실천을 해보아요!
          </center>
        </Typography>
      </div>
      <div style={{ width: "700px", maxWidth: "50%", margin: "0 auto" }}>
        <Carousel />
      </div>
      <div
        style={{
          width: "800px",
          maxWidth: "100%",
          margin: "0",
          marginLeft: "4%",
        }}
      >
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "5rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(15px, 2vw, 30px)",
                sm: "clamp(15px, 2vw, 30px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "primary.main",
              whiteSpace: "nowrap",
              flexGrow: "1",
              fontFamily: "Black Han Sans, sans-serif"
            }}
          >
            RESTAURANT
          </Typography>
          <Typography
            sx={{
              fontSize: {
              xs: "clamp(10px, 2vw, 20px)",
              sm: "clamp(10px, 2vw, 20px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "info.main",
              whiteSpace: "wrap",
              padding: "1rem",
              flexGrow: "0.898",
              fontWeight: "bold"
            }}
          >
            환경보호를 위한 첫번째 걸음,
            <br />
            카테고리와 지역별로 비건 식당을 소개해드릴게요.
          </Typography>
        </div>
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(15px, 2vw, 30px)",
                sm: "clamp(15px, 2vw, 30px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "primary.main",
              whiteSpace: "nowrap",
              flexGrow: "1",
              fontFamily: "Black Han Sans, sans-serif"
            }}
          >
            PARK
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(10px, 2vw, 20px)",
                sm: "clamp(10px, 2vw, 20px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "info.main",
              whiteSpace: "wrap",
              padding: "1rem",
              flexGrow: "0.93",
              fontWeight: "bold"
            }}
          >
            환경보호를 위한 두번째 걸음,
            <br />
            공원에서 자연의 소중함을 느껴보세요.
          </Typography>
        </div>
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "10rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(15px, 2vw, 30px)",
                sm: "clamp(15px, 2vw, 30px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "primary.main",
              whiteSpace: "nowrap",
              flexGrow: "1",
              fontFamily: "Black Han Sans, sans-serif"
            }}
          >
            SHARE
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(10px, 2vw, 20px)",
                sm: "clamp(10px, 2vw, 20px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "info.main",
              whiteSpace: "wrap",
              padding: "1rem",
              flexGrow: "0.85",
              fontWeight: "bold"
            }}
          >
            환경보호를 위한 세번째 걸음,
            <br />
            나의 그린라이프를 기록하고 자랑해보세요.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AboutGreenService;
