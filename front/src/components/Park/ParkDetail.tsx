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
import { useGetParkDetailDataQuery } from "../../services/parksApi";
import { useParams } from "react-router-dom";
import KaKaoParkRoadView from "./KaKaoParkRoadView";
import { Park } from "../../models/park.model";

const ParkDetail = () => {
  const { parkId } = useParams() as { parkId: string };
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetParkDetailDataQuery(parkId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", marginTop: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <KaKaoParkRoadView data={data as Park} />
          <CardHeader style={{marginTop: "0.5rem", marginLeft: "1rem"}} title={<span style={{ fontWeight: "bold"}}>{data?.name}</span>} />
          <CardContent style={{marginTop: "-1rem", marginLeft: "1rem"}}>
            <Typography variant="body1">
            <img
                  src={require("../../assets/images/region.png")}
                  alt="Region Icon"
                  style={{ width: "13px", height: "13px", verticalAlign: "middle" }}
                  />{" "}
                  {data?.region}</Typography>
            <Typography variant="body1">
            <img
              src={require("../../assets/images/address.png")}
              alt="Address Icon"
              style={{ width: "13px", height: "13px", verticalAlign: "middle" }}
              />{" "}{data?.address}</Typography>
            <Typography variant="body1">
            <img
              src={require("../../assets/images/phone.png")}
              alt="Phone Icon"
              style={{ width: "13px", height: "13px", verticalAlign: "middle" }}
              />{" "}{data?.tel}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ParkDetail;
