import React, { FC } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
  Link,
  IconButton,
  Checkbox,
} from "@mui/material";
import KaKaoParkRoadView from "./KaKaoParkRoadView";
import { Park } from "../../models/park.model";
import { useGetRestaurantDetailDataQuery } from "../../services/restaurantsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { useGetParkDetailDataQuery } from "../../services/parksApi";
import Button from "@mui/material/Button";
import * as Baskets from "../../features/BasketReducer";
import * as BasketParks from "../../features/BasketParkReducer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import LoadingImage from "../common/Loading";

const Rightbar2: FC<any> = ({
  Type,
  setShow,
}: {
  Type: string;
  setShow: any;
}) => {
  const dispatch = useDispatch();

  const { selectedRestaurantItemId } = useSelector(({ basket }: RootState) => ({
    selectedRestaurantItemId: basket.selectedItemId,
  }));

  const { selectedParkItemId } = useSelector(({ basketPark }: RootState) => ({
    selectedParkItemId: basketPark.selectedItemId,
  }));

  const {
    data: RestaurantData,
    isSuccess: RestaurantSuccess,
    isFetching: RestaurantFetching,
  } = useGetRestaurantDetailDataQuery(selectedRestaurantItemId, {
    skip: Type === "park",
  });

  const {
    data: ParkData,
    isSuccess: ParkSuccess,
    isFetching: ParkFetching,
  } = useGetParkDetailDataQuery(selectedParkItemId, {
    skip: Type === "restaurant",
  });

  if (Type === "restaurant" && RestaurantFetching) {
    return <LoadingImage />;
  }

  if (Type === "park" && ParkFetching) {
    return <LoadingImage />;
  }

  const handleBarClose = () => {
    setShow(false);
    if (Type === "restaurant") {
      dispatch(Baskets.resetSelectedItemId());
    } else if (Type === "park") {
      dispatch(BasketParks.resetSelectedItemId());
    }
  };

  if (!selectedRestaurantItemId && Type === "restaurant") {
    return null;
  }
  if (!selectedParkItemId && Type === "park") {
    return null;
  }

  return (
    <Box marginTop={4}>
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
            {Type === "restaurant" ? (
              <CardMedia
                component="img"
                height="200"
                src={RestaurantData?.image}
                alt="스팟 이미지"
              />
            ) : (
              <KaKaoParkRoadView spotData={ParkData as Park} />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Link
              href={
                Type === "restaurant"
                  ? `/restaurant/detail/${RestaurantData?._id}`
                  : `/park/detail/${ParkData?._id}`
              }
              sx={{ textDecoration: "none" }}
            >
              {Type === "restaurant" ? (
                <CardHeader
                  title={
                    <span>
                      {RestaurantData?.name}
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
                          checked={true}
                        />
                        {/* @ts-ignore */}
                        {RestaurantData?.contacts.filter(
                          //  @ts-ignore
                          (item) => item.value === 1
                        ).length + "찜"}
                      </IconButton>
                    </span>
                  }
                  subheader={RestaurantData?.category}
                />
              ) : (
                <CardHeader
                  title={
                    <span>
                      {ParkData?.name}
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
                          checked={true}
                        />
                        {/* @ts-ignore */}
                        {ParkData?.contacts.filter((item) => item.value === 1)
                          .length + "찜"}
                      </IconButton>
                    </span>
                  }
                />
              )}
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
                {Type === "restaurant" ? RestaurantData?.tel : ParkData?.tel}
              </Typography>
              {Type === "restaurant" && (
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
                  {RestaurantData?.description}
                </Typography>
              )}
              {Type === "restaurant" && (
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
                  {RestaurantData?.reservation ? "예약가능" : "예약불가능"}
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
                {Type === "restaurant"
                  ? RestaurantData?.address
                  : ParkData?.address}
              </Typography>
              <Button variant="contained" onClick={handleBarClose}>
                닫기
              </Button>
            </CardContent>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default Rightbar2;
