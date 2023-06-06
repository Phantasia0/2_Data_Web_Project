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
  Link,
} from "@mui/material";

import { useGetDetailDataQuery } from "../../services/restaurantsApi";
import { useParams } from "react-router-dom";
import Rating from "./Rating";

const RestaurantKeywordDetail = () => {
  const { restaurantId } = useParams() as { restaurantId: string };
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetDetailDataQuery(restaurantId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    placenamefull,
    mainphotourl,
    address,
    phonenum,
    homepage,
    category,
    tags,
    openHour,
  } = data.basicInfo;

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", marginTop: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            src={mainphotourl}
            alt={mainphotourl}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardHeader
            title={placenamefull}
            subheader={address?.region?.fullname}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {category?.cate1name}
            </Typography>
            <Typography variant="body1">
              <Link
                href={homepage}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                {homepage}
              </Link>
            </Typography>
            <Typography variant="body1">{phonenum}</Typography>
            <Typography variant="body1">
              {openHour?.periodList[0]?.timeList[0]?.timeSE}{" "}
              {openHour?.periodList[0]?.timeList[0]?.dayOfWeek}
            </Typography>
            <Typography variant="body1">
              {tags?.map((tag: any) => (
                <li key={tag} style={{ listStyle: "none" }}>
                  #{tag}
                </li>
              ))}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          메뉴
        </Typography>
        <Grid container spacing={2}>
          {data?.menuInfo?.menuList
            .slice(0, 3)
            .map((item: any, index: number) => (
              <Grid item xs={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1">{item.menu}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          리뷰
        </Typography>
        {data?.comment?.list?.slice(0, 3).map((review: any, index: number) => (
          <Card key={index} sx={{ marginTop: 2 }}>
            <CardHeader
              avatar={<Avatar src={review.profile} aria-label="user"></Avatar>}
            />
            <CardContent>
              <Rating value={review.point} />
              <Typography variant="body2">{review.contents}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default RestaurantKeywordDetail;
