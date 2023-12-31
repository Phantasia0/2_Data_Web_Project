import React, { useState } from "react";
import {
  Avatar,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Checkbox,
} from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { usePutRestaurantIntoBasketMutation } from "../../services/restaurantsApi";
import { useGetUserBasketQuery } from "../../services/authApiWrapper";
import { selectCurrentUser } from "../../features/AuthReducer";

const RestaurantVeganItem = ({ resData, refetchRestaurantData }: any) => {
  const { basketItem }: { basketItem: any } = useSelector(
    ({ basket }: RootState) => ({
      // @ts-ignore
      basketItem: basket.item,
    })
  );
  const user = useSelector(selectCurrentUser);

  const boxStyle = {
    backgroundColor:
      resData?._id === basketItem?._id ? "#F3F3F3" : "transparent",
    border: `2px solid ${
      resData?._id === basketItem?._id ? "#397261" : "transparent"
    }`,
    borderRadius: "1rem",
  };

  const {
    data: basketData,
    isSuccess: basketSuccess,
    isError: basketError,
    isLoading: basketLoading,
    isFetching: basketFetching,
    refetch,
  } = useGetUserBasketQuery(undefined);

  const [addMyRestaurant, { data, isSuccess, isError, isLoading }] =
    usePutRestaurantIntoBasketMutation();

  const handleMyRestaurant = async (e: any) => {
    e.stopPropagation();
    const success = await addMyRestaurant(resData._id).unwrap();
    if (success) {
      refetch();
      refetchRestaurantData();
    }
  };

  return (
    <Box sx={boxStyle}>
      <Link
        href={`/restaurant/detail/${resData._id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="식당" src={resData?.image} />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            secondary={
              <React.Fragment>
                <Typography component="div" variant="body2">
                  <span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginRight: "0.5rem",
                      }}
                    >
                      {resData?.name}
                    </span>
                    <IconButton
                      sx={{ fontSize: "15px", fontWeight: "blod" }}
                      onClick={handleMyRestaurant}
                      disabled={!user}
                    >
                      <Checkbox
                        icon={<FavoriteBorder sx={{ fontSize: "1rem" }} />}
                        checkedIcon={
                          <Favorite sx={{ color: "red", fontSize: "1rem" }} />
                        }
                        checked={resData?.contactCheck}
                      />
                      {resData?.contactCount + "찜"}
                    </IconButton>
                  </span>
                </Typography>
                <div>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
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
                  </Typography>
                  {resData?.tel
                    ? resData.tel
                    : "전화번호가 등록되지 않았습니다."}
                </div>
                <div>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
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
                  </Typography>
                  {resData?.category
                    ? resData?.category
                    : "카테고리가 등록되지 않았습니다."}
                </div>
                <div>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
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
                  </Typography>
                  {resData?.address
                    ? resData?.address
                    : "주소가 등록되지 않았습니다."}
                </div>
                <div>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
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
                  </Typography>
                  {resData?.region
                    ? resData?.region
                    : "리전이 등록되지 않았습니다."}
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      </Link>
      <Divider variant="inset" component="li" />
    </Box>
  );
};

export default RestaurantVeganItem;
