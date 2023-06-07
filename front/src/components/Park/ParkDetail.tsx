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
        <Grid item xs={12} md={6}>
          <CardHeader title={data?.name} />
          <CardContent>
            <Typography variant="body1">{data?.region}</Typography>
            <Typography variant="body1">{data?.address}</Typography>
            <Typography variant="body1">{data?.tel}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ParkDetail;
