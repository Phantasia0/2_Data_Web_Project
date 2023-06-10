import React from "react";
import { Typography, Button, Link,Box } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { fontdesign } from "../../theme/fontdesign";

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
        <img
          src={require("../../assets/images/HomeImage.jpg")}
          alt="Home Image"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "12%",
            left: {
              xs: "65%",
            },
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <Typography sx={fontdesign.xsTop}>
            환경을 위한 첫걸음
          </Typography>
          <Typography sx={fontdesign.xsBottom}>
            그린라이프와 함께
          </Typography>
        </Box>
          <Box
            sx={{
              position: "absolute",
              top: {
                xs: "35%",
              },
              left: {
                xs: "60%",
              },
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: "5px",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  paddingLeft: "1vw",
                  paddingRight: "1vw",
                  marginTop :'0.5vw',
                  marginBottom :'0.5vw'
                },
                lineHeight: { xs: "1.5vw" },
                color: "secondary.main",
                whiteSpace: "nowrap",
                fontFamily: "NanumSquareExtraBold, sans-serif"
              }}
            >
              지구, 그리고 우리 모두를 위한 작은 실천 
            </Typography>
            {/* <div
              style={{
                position: "absolute",
                top: "400%",
                left: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
                borderRadius: "50px",
                zIndex: 1,
              }}
            >
              <Link
                href="/front/src/components/Restaurant/Restaurant"
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
                    fontFamily: "Black Han Sans, sans-serif"
                  }}
                >
                  Service
                </Button>
              </Link>
            </div> */}
          </Box>
      </div>
      <div>
        <Typography
          sx={fontdesign.xsTitle}
          style={{marginTop: "10vw"}}
        >
          녹색 소비자가 되어봐요
        </Typography>
      </div>
      <div>
        <Typography
          sx={fontdesign.xsText}
          style={{marginTop: "7vw"}}
        >
          GreenLife란, 환경과 건강을 생각하는, 친환경적이고 지속 가능한 지구
          차원의 성장을 위한 삶<br />
          <center>
          GreenLife는 일상 속에서 작은 실천을 도와 드립니다.
          </center>
        </Typography>
      </div>
      <div>
        <Typography
          sx={fontdesign.xsTitle}
          style={{marginTop: "10vw"}}
        >
          환경을 위한 당신의 선택
        </Typography>
      </div>
      <div
        style={{
          marginTop: "4vw",
          display: "flex",
          flexDirection: "row",
          gap: "6vw",
        }}
      >
        <div style={{margin:"0 0 0 20px"}}>
          <img
            src={require("../../assets/images/VeganRestaurant.jpg")}
            alt="VeganRestaurant"
            width={'400vw'}
            height={'160vw'}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
          <Typography
            sx={fontdesign.xsText}>
            <Link
              href="/front/src/components/Restaurant/Restaurant"
              underline="none"
              sx={{ color: "info.main" }}
            >
              비건 레스토랑
            </Link>
          </Typography>
        </div>
        <div style={{margin:"0 20px 0 0 "}}>
          <img
            src={require("../../assets/images/Park.jpg")}
            alt="VeganRestaurant"
            width={'400vw'}
            height={'160vw'}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
          <Typography
            sx={fontdesign.xsText}
          >
            <Link
              href="/front/src/components/Restaurant/Restaurant"
              underline="none"
              sx={{ color: "info.main" }}
            >
              자연에서의 시간
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
