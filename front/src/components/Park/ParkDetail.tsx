import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useGetParkDetailDataQuery } from "../../services/parksApi";
import { useParams } from "react-router-dom";
import KaKaoParkRoadView from "./KaKaoParkRoadView";
import { Park } from "../../models/park.model";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import LoadingImage from "../common/Loading";

const ParkDetail = () => {
  const { parkId } = useParams() as { parkId: string };
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetParkDetailDataQuery(parkId);

  if (isLoading) {
    return <LoadingImage />;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", marginTop: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <KaKaoParkRoadView data={data as Park} />
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
                  fontFamily: "NanumSquareExtraBold, sans-serif",
                  marginLeft: "1rem",
                  marginTop: "1vw",
                }}
              >
                <span>{data?.name}</span>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "blod",
                    marginLeft: "10px",
                  }}
                >
                  현재 {/* @ts-ignore */}
                  {data?.contacts?.filter((item) => item.value === 1).length +
                    "명"}
                  이 찜하고 있어요
                </Typography>
              </Typography>
            }
          />
          <CardContent style={{ marginTop: "-1rem", marginLeft: "1rem" }}>
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
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ParkDetail;
