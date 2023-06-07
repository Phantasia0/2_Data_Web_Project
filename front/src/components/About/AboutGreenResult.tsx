import React from "react";
import { Typography, Button, Link } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const AboutGreenResult = () => {
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
                xs: "clamp(20px, 3vw, 40px)",
                sm: "clamp(30px, 3vw, 59px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "secondary.main",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            지구를 지키는 우리의 힘,
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(20px, 3vw, 40px)",
                sm: "clamp(30px, 3vw, 59px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "secondary.main",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            환경보호 실천!
          </Typography>
        </div>
      </div>
      <div>
        <Typography
          sx={{
            fontSize: {
              xs: "clamp(15px, 2vw, 30px)",
              sm: "clamp(25px, 2vw, 50px)",
            },
            lineHeight: { xs: "1.2", sm: "1.5" },
            color: "primary.main",
            whiteSpace: "nowrap",
            marginTop: "10rem",
          }}
        >
          기대효과
        </Typography>
      </div>
      <div style={{ width: "1400px", maxWidth: "100%", margin: "0 auto" }}>
        <div>
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(15px, 2vw, 30px)",
                sm: "clamp(25px, 2vw, 50px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "primary.main",
              whiteSpace: "wrap",
              marginTop: "15rem",
            }}
          >
            <center>단계적인 채식으로 환경호보에 기여하기</center>
          </Typography>
        </div>
        <div
          style={{
            marginTop: "10rem",
            display: "flex",
            marginBottom: "10rem",
            justifyContent: "center",
          }}
        >
          <img
            src={require("../../assets/images/graphXC2.png")}
            alt="VeganRestaurant"
            width="40%"
            height="40%"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </div>
        <Typography
          sx={{
            fontSize: {
              xs: "clamp(10px, 2vw, 15px)",
              sm: "clamp(15px, 2vw, 30px)",
            },
            lineHeight: { xs: "1.2", sm: "1.5" },
            color: "info.main",
            whiteSpace: "wrap",
            padding: "1rem",
          }}
        >
          <center>
            위 그래프는 육식이 개인의 탄소 배출량에 어떤 영향을 미치는지
          </center>
          <center>오직 음식이 만들어져서 공급될 때 까지만의 </center>
          <center>온실가스 배출량을 바탕으로 계산됐어요.</center>
          <br />
          <center>
            역시나 육식을 좋아하는 쪽이 탄소 배출량이 가장 많았고,
          </center>
          <center>
            채식주의자의 탄소 배출량은 그에 비해 거의 절반에 불과해요.
          </center>
          <center>엄격한 채식주의자(Vegan)는 그보다 더 낮아요.</center>
          <br />
          <center>
            추가로 알 수 있는 것은 소고기 대신에 닭고기를 먹는 경우 탄소 배출을
          </center>
          <center>25%나 줄일 수 있어요.</center>
        </Typography>
      </div>
      <div
        style={{
          marginTop: "10rem",
          display: "flex",
          marginBottom: "10rem",
          justifyContent: "center",
        }}
      >
        <img
          src={require("../../assets/images/eirthday.jpg")}
          alt="VeganRestaurant"
          width="100%"
          height="100%"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </div>
      <Typography
        sx={{
          fontSize: {
            xs: "clamp(10px, 2vw, 15px)",
            sm: "clamp(15px, 2vw, 30px)",
          },
          lineHeight: { xs: "1.2", sm: "1.5" },
          color: "info.main",
          whiteSpace: "wrap",
          padding: "1rem",
          marginBottom: "10rem",
        }}
      >
        <center>
          이처럼 우리가 매일 먹는 식탁에서 작은 부분이 음식물의 탄소 배출에
          영향을 미칠 수 있어요.
        </center>
        <center>
          육류 소비 대신 곡물, 과일, 채소를 식단에 더 많이 포함시켜 육류 소비를
          줄이고,
        </center>
        <center>
          친환경 식재료를 선택하는 것이 탄소 배출을 줄이는 데에 효과적이에요.
        </center>
        <br />
        <center>
          또한, 음식물 쓰레기는 분해될 때 메탄 가스를 생성하여 온실가스가
          배출되요.
        </center>
        <center>음식물 쓰레기를 줄이고, 적절히 처리하는 방법을 찾아요.</center>
        <center>
          이러한 변화를 식단에 도입하면 생활 속에서 탄소 배출을 줄일 수 있어요.
        </center>
      </Typography>
    </div>
  );
};

export default AboutGreenResult;
