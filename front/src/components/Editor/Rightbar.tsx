import React, { FC, useEffect, useState } from "react";
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
  IconButton,
  Checkbox,
} from "@mui/material";
import KaKaoParkRoadView from "./KaKaoParkRoadView";
import { Park } from "../../models/park.model";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Rightbar: FC<any> = ({ data }) => {
  const [spotData, setSpotData] = useState<any>(null);
  const [spotType, setSpotType] = useState<any>(null);

  useEffect(() => {
    if (data?.restaurant) {
      setSpotData(data?.restaurant);
      setSpotType("restaurant");
    } else {
      setSpotData(data?.park);
      setSpotType("park");
    }
  }, [data]);

  console.log(spotData);
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <Box position="fixed" marginTop={4}>
      <Box
        sx={{
          width: "100%",
          overflow: "auto",
          maxHeight: "85%",
          display: "flex",
          justifyContent: "center",
          maxWidth: 300,
        }}
      >
        <Card
          sx={{
            margin: "auto",
            border: "solid 2px green",
            borderRadius: "10px",
          }}
        >
          <Grid>
            {spotType === "restaurant" ? (
              <CardMedia
                component="img"
                height="200"
                src={spotData?.image}
                alt="스팟 이미지"
              />
            ) : (
              <KaKaoParkRoadView spotData={spotData as Park} />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Link
              href={
                spotType === "restaurant"
                  ? `/restaurant/detail/${spotData?._id}`
                  : `/park/detail/${spotData?._id}`
              }
              sx={{ textDecoration: "none" }}
            >
              <CardHeader
                title={
                  <span>
                    {spotData?.name}
                    <IconButton
                      sx={{
                        fontSize: "15px",
                        fontWeight: "blod",
                        marginLeft: "10px",
                      }}
                      // onClick={handleMyRestaurant}
                    >
                      <Checkbox
                        icon={<FavoriteBorder sx={{ fontSize: "1rem" }} />}
                        checkedIcon={
                          <Favorite sx={{ color: "red", fontSize: "1rem" }} />
                        }
                        disabled={false}
                        /* @ts-ignore */
                        checked={data?.contactCheck}
                      />
                      {/* @ts-ignore */}
                      {spotData?.contacts.filter((item) => item.value === 1)
                        .length + "찜"}
                    </IconButton>
                  </span>
                }
                subheader={spotData?.category}
              />
            </Link>
            <CardContent>
              <Typography variant="body1">
                <img
                  src={require("../../assets/images/phone.png")}
                  alt="Region Icon"
                  style={{
                    width: "13px",
                    height: "13px",
                    verticalAlign: "middle",
                  }}
                />{" "}
                {spotData?.tel}
              </Typography>
              {spotType === "restaurant" && (
                <Typography variant="body1">
                  <img
                    src={require("../../assets/images/category.png")}
                    alt="Region Icon"
                    style={{
                      width: "13px",
                      height: "13px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  {spotData?.description}
                </Typography>
              )}
              {spotType === "restaurant" && (
                <Typography variant="body1">
                  <img
                    src={require("../../assets/images/information.png")}
                    alt="Region Icon"
                    style={{
                      width: "13px",
                      height: "13px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  {spotData?.reservation ? "예약가능" : "예약불가능"}
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                <img
                  src={require("../../assets/images/region.png")}
                  alt="Region Icon"
                  style={{
                    width: "13px",
                    height: "13px",
                    verticalAlign: "middle",
                  }}
                />{" "}
                {spotData?.address}
              </Typography>
            </CardContent>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default Rightbar;
