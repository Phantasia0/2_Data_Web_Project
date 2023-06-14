import React from "react";
import { Typography, Button, Link } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Carousel from "./Carousel";
import { fontdesign } from "../../theme/fontdesign";

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
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "14%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <Typography sx={fontdesign.xsTop}>그린라이프,</Typography>
          <Typography sx={fontdesign.xsBottom}>서비스</Typography>
        </div>
      </div>
      <div>
        <Typography sx={fontdesign.xsTitle} style={{ marginTop: "10vw" }}>
          서비스 소개
        </Typography>
      </div>
      <div>
        <Typography sx={fontdesign.xsText} style={{ marginTop: "7vw" }}>
          <p style={{ textAlign: "center" }}>
            온실가스의 배출량을 줄일 수 있도록 일상에서 작은 실천을 해보아요!
          </p>
        </Typography>
      </div>
      <div style={{ width: "700vw", maxWidth: "50%" }}>
        <Carousel />
      </div>
      <div
        style={{
          width: "800vw",
          maxWidth: "100%",
          marginLeft: "4%",
        }}
      >
        <div
          style={{
            marginTop: "7vw",
            display: "flex",
            gap: "5vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={fontdesign.xsTitle}>RESTAURANT</Typography>
          <Typography sx={fontdesign.xsText}>
            환경보호를 위한 첫번째 걸음,
            <br />
            카테고리와 지역별로 비건 식당을 소개해드릴게요.
          </Typography>
        </div>
        <div
          style={{
            marginTop: "5vw",
            display: "flex",
            gap: "5vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={fontdesign.xsTitle}>PARK</Typography>
          <Typography sx={fontdesign.xsText}>
            환경보호를 위한 두번째 걸음,
            <br />
            공원에서 자연의 소중함을 느껴보세요.
          </Typography>
        </div>
        <div
          style={{
            marginTop: "5vw",
            display: "flex",
            gap: "5vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={fontdesign.xsTitle}>ACTIVITY</Typography>
          <Typography sx={fontdesign.xsText}>
            환경보호를 위한 세번째 걸음,
            <br />
            카테고리별 일상 속 실천방안을 확인해보세요.
          </Typography>
        </div>
        <div
          style={{
            marginTop: "5vw",
            display: "flex",
            gap: "5vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={fontdesign.xsTitle}>SHARE</Typography>
          <Typography sx={fontdesign.xsText}>
            환경보호를 위한 네번째 걸음,
            <br />
            나의 그린라이프를 기록하고 자랑해보세요.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AboutGreenService;
