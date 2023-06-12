import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Grid,
} from "@mui/material";
import { useGetRestaurantDetailDataQuery } from "../../services/restaurantsApi";
import { useParams } from "react-router-dom";
import { fontdesign } from "../../theme/fontdesign";

const RestaurantVeganDetail = () => {
  const { restaurantId } = useParams() as { restaurantId: string };
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRestaurantDetailDataQuery(restaurantId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            src={data?.image}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            marginTop: "1.5rem",
          }}
        >
          <CardHeader
            title={
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "2vw",
                  },
                  lineHeight: { xs: "2.2vw" },
                  color: "primary.main",
                  whiteSpace: "nowrap",
                  marginTop: "2vw",
                  fontFamily: "NanumSquareExtraBold, sans-serif",
                }}
              >
                <span>{data?.name}</span>
              </Typography>
            }
          />
          <CardContent>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/region.png")}
                alt="Region Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.region}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/category.png")}
                alt="category Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.category}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/address.png")}
                alt="Address Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.address}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/phone.png")}
                alt="Phone Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.tel}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/information.png")}
                alt="Info Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.reservation ? "예약 가능" : "예약 불가능"}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/food.png")}
                alt="food Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.description}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RestaurantVeganDetail;
