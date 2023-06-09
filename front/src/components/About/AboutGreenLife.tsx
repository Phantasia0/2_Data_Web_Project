import React from "react";
import { Typography, Button, Link } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const AboutGreenLife = () => {
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
            왜 실천해야할까요?
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
          지구가 슬퍼하고 있어요
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
            marginTop: "5rem",
            fontWeight: "bold"
          }}
        >
          <center>나 하나쯤은 괜찮겠지 하는 생각과 행동들이</center>
          <center>
            결국은 우리가 마시고 먹는 공기와 수질, 토양 속 오염 등을 부추기고
            있다는 사실
          </center>
          <center>
            그리고 이로 인한 피해는 부메랑이 되어 다시 우리의 일상의 삶 속에
            돌아온다는 것을 아시나요?
          </center>
        </Typography>
      </div>
      <div style={{ width: "1400px", maxWidth: "100%", margin: "0 auto" }}>
        <div>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(15px, 2vw, 30px)",
                sm: "clamp(15px, 2vw, 30px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "primary.main",
              whiteSpace: "wrap",
              marginTop: "10rem",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            <center>환경문제에 대한 인식</center>
          </Typography>
        </div>
        <div
          style={{
            marginTop: "0rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "5rem",
            alignItems: "center",
            marginLeft: '14rem',
          }}
        >
          <img
            src={require("../../assets/images/graphXC.png")}
            alt="VeganRestaurant"
            width="35%"
            height="35%"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
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
              fontWeight: "bold"
            }}
          >
            <center>
              지속가능한 삶과 친환경에 대한 관심이 날로 증가하고 있어요.
            </center>
            <center>
              '2018년 환경문제 관심도 설문조사' 데이터를 분석한 결과
            </center>
            <center>78.6%가 환경문제에 대한 관심을 가지고 있답니다.</center>
            <center>당신은 어느쪽인가요?</center>
          </Typography>
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
              whiteSpace: "wrap",
              marginTop: "10rem",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            <center>인식하는 시급한 과제</center>
          </Typography>
        </div>
        <div
          style={{
            marginTop: "0rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "10rem",
            alignItems: "center",
            marginLeft: '14rem',
          }}
        >
          <img
            src={require("../../assets/images/graphXC2.png")}
            alt="VeganRestaurant"
            width="35%"
            height="35%"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
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
              fontWeight: "bold"
            }}
          >
            <center>특히 온실가스 문제를 시급한 과제로 인식하며,</center>
            <center>
              사람들이 온실가스 줄이기 운동에 관심을 가지고 있어요.
            </center>
          </Typography>
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
              whiteSpace: "wrap",
              marginTop: "10rem",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            <center>늘어나는 온실가스</center>
          </Typography>
        </div>
        <div
          style={{
            marginTop: "0rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "10rem",
            alignItems: "center",
            marginLeft: '14rem',
          }}
        >
          <img
            src={require("../../assets/images/total_co2.png")}
            alt="VeganRestaurant"
            width="35%"
            height="35%"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
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
              fontWeight: "bold"
            }}
          >
            <center>하지만 늘어나는 관심과 다르게</center>
            <center>온실가스 배출량은 꾸준히 증가하고 있어요.</center>
          </Typography>
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
              whiteSpace: "wrap",
              marginTop: "10rem",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            <center>그 주범은 육류!</center>
          </Typography>
        </div>
        <div
          style={{
            marginTop: "0rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "10rem",
            alignItems: "center",
            marginLeft: '14rem',
          }}
        >
          <img
            src={require("../../assets/images/co2perfood.png")}
            alt="VeganRestaurant"
            width="35%"
            height="35%"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
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
              fontWeight: "bold"
            }}
          >
            <center>온실가스를 배출하는 주된 원인이 동물성 식품 </center>
            <center>특히 육고기의 소비가 식품생산과정에서</center>
            <center> 많은 온실가스를 배출한다는것을 알고계셨나요?</center>
          </Typography>
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
              whiteSpace: "wrap",
              marginTop: "10rem",
              fontFamily: "NanumSquareExtraBold, sans-serif"
            }}
          >
            <center>늘어나는 육류 소비량</center>
          </Typography>
        </div>
        <div
          style={{
            marginTop: "0rem",
            display: "flex",
            gap: "3rem",
            marginBottom: "10rem",
            alignItems: "center",
            marginLeft: '14rem',
          }}
        >
          <img
            src={require("../../assets/images/meat_consume.png")}
            alt="VeganRestaurant"
            width="35%"
            height="35%"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
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
              fontWeight: "bold"
            }}
          >
            <center> '육류 섭취량 1990 ~ 2025 ~ ' 데이터에 따르면 </center>
            <center>전세계 육류 소비량은 지속적으로 증가하는 추세이며</center>
            <center>
              늘어나는 소비량이 환경오염으로 이어질 것으로 보여요.
            </center>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AboutGreenLife;
