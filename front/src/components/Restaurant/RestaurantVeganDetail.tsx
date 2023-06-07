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

const RestaurantVeganDetail = () => {
  const { restaurantId } = useParams() as { restaurantId: string };
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRestaurantDetailDataQuery(restaurantId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", marginTop: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            src={data?.image}
            alt={data?.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardHeader title={data?.name} />
          <CardContent>
            <Typography variant="body1">{data?.region}</Typography>
            <Typography variant="body1">{data?.category}</Typography>
            <Typography variant="body1">{data?.description}</Typography>
            <Typography variant="body1">{data?.address}</Typography>
            <Typography variant="body1">{data?.tel}</Typography>
            <Typography variant="body1">
              {data?.reservation ? "예약 가능" : "예약 불가능"}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RestaurantVeganDetail;
