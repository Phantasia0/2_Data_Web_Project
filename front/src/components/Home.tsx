import React from "react";
import { Typography, Button, Link } from "@mui/material";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Home = () => {
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
        <img src={require("../assets/images/HomeImage.jpg")} alt="Home Image" />
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "64%",
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
            환경을 위한 첫걸음
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
            그린라이프와 함께.
          </Typography>
        </div>
        {width >= 1500 && (
          <div
            style={{
              position: "absolute",
              top: "38%",
              left: "64%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: "5px",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "clamp(8px, 2vw, 10px)",
                  sm: "clamp(10px, 2vw, 28px)",
                },
                lineHeight: { xs: "1.2", sm: "1.5" },
                color: "secondary.main",
                whiteSpace: "nowrap",
              }}
            >
              지구, 그리고 우리 모두를 위한 작은 실천
            </Typography>
            <div
              style={{
                position: "absolute",
                top: "400%",
                left: "81%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
                borderRadius: "50px",
                zIndex: 1,
              }}
            >
              <Link
                href="/restaurant"
                underline="none"
                sx={{ color: "secondary.main" }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: "50px",
                    color: "secondary.main",
                    borderColor: "secondary.main",
                  }}
                >
                  Service
                </Button>
              </Link>
            </div>
          </div>
        )}
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
          녹색 소비자가 되어봐요
        </Typography>
      </div>
      <div>
        <Typography
          sx={{
            fontSize: {
              xs: "clamp(10px, 2vw, 15px)",
              sm: "clamp(15px, 2vw, 30px)",
            },
            lineHeight: { xs: "1.2", sm: "1.5" },
            color: "info.main",
            whiteSpace: "nowrap",
            marginTop: "5rem",
          }}
        >
          GreenLife 란, 환경과 건강을 생각하는, 친환경적이고 지속 가능한 지구
          차원의 성장을 위한 삶<br />
          <center>
            저희 그린라이프는 일상 속에서 작은 실천을 도와 드립니다
          </center>
        </Typography>
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
            marginTop: "15rem",
          }}
        >
          환경을 위한 당신의 선택
        </Typography>
      </div>
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          gap: "3rem",
          marginBottom: "10rem",
        }}
      >
        <div>
          <img
            src={require("../assets/images/VeganRestaurant.jpg")}
            alt="VeganRestaurant"
            width={500}
            height={200}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(10px, 2vw, 15px)",
                sm: "clamp(15px, 2vw, 30px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "info.main",
              whiteSpace: "nowrap",
              padding: "1rem",
            }}
          >
            <Link
              href="/restaurant"
              underline="none"
              sx={{ color: "info.main" }}
            >
              비건 레스토랑
            </Link>
          </Typography>
        </div>
        <div>
          <img
            src={require("../assets/images/Park.jpg")}
            alt="VeganRestaurant"
            width={500}
            height={200}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: "clamp(10px, 2vw, 15px)",
                sm: "clamp(15px, 2vw, 30px)",
              },
              lineHeight: { xs: "1.2", sm: "1.5" },
              color: "info.main",
              whiteSpace: "nowrap",
              padding: "1rem",
            }}
          >
            <Link
              href="/restaurant"
              underline="none"
              sx={{ color: "info.main" }}
            >
              공원으로 떠나요
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
