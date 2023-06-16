import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import MarkerModal from "./MarkderModal";
import { shallowEqual, useSelector } from "react-redux";
import { useGetUserBasketQuery } from "../../services/authApiWrapper";
import Button from "@mui/material/Button";
import {
  useGetRestaurantsDataQuery,
  useGetRestaurantsFilteredDataQuery,
  usePutRestaurantIntoBasketMutation,
} from "../../services/restaurantsApi";
import { useDispatch } from "react-redux";
import {
  resetSelectedItemId,
  setIsClicked,
  setSelectedItemId,
} from "../../features/BasketReducer";
import { selectCurrentUser } from "../../features/AuthReducer";
import { RootState } from "../../features/configureStore";

const Basket = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, isFetching, refetch } =
    useGetUserBasketQuery(undefined);

  const [addMyRestaurant] = usePutRestaurantIntoBasketMutation();

  const [myRestaurantList, setMyRestaurantList] = useState(
    data?.restaurant.map((item: any) => item.name)
  );

  const user = useSelector(selectCurrentUser);

  const currentUrl = window.location.pathname;
  useEffect(() => {
    setMyRestaurantList(data?.restaurant);
  }, []);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      const filteredRestaurants = data.restaurant;
      setMyRestaurantList(filteredRestaurants);
    }
  }, [isFetching, isSuccess]);

  //

  const { isClicked, basketItem }: { isClicked: boolean; basketItem: any } =
    useSelector(({ basket }: RootState) => ({
      // @ts-ignore
      isClicked: basket.isClicked,
      // @ts-ignore
      basketItem: basket.item,
    }));

  // 새로 추가
  const { region, foodCategory, filtered, pageNumber, pageFilteredNumber } =
    useSelector(
      ({ restaurant }: RootState) => ({
        region: restaurant.region,
        foodCategory: restaurant.foodCategory,
        filtered: restaurant.filtered,
        pageNumber: restaurant.pageNumber,
        pageFilteredNumber: restaurant.pageFilteredNumber,
      }),
      shallowEqual
    );

  const { refetch: refetchRestaurantData } = useGetRestaurantsDataQuery(
    pageNumber as number,
    { skip: !isClicked }
  );

  const { refetch: refetchFilteredRestaurantData } =
    useGetRestaurantsFilteredDataQuery(
      {
        page: pageFilteredNumber,
        region: region,
        foodCategory: foodCategory,
      },
      {
        skip: !isClicked,
      }
    );

  //

  const handleDeleteRestaurant = async (item: any) => {
    dispatch(setIsClicked(true));
    const success = await addMyRestaurant(item._id).unwrap();
    if (success) {
      dispatch(setIsClicked(false));
      refetch();
      if (filtered) {
        refetchFilteredRestaurantData();
      } else {
        refetchRestaurantData();
      }
    }
  };

  const getItems = (myRestaurantList: any) => {
    if (!isFetching && isSuccess) {
      if (myRestaurantList?.length === 0) {
        dispatch(resetSelectedItemId());
      }
      return (
        <>
          {myRestaurantList?.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1.2vw" } }}
              component="span"
              color="secondary.main"
              fontWeight="bold"
            >
              <p style={{ textAlign: "center" }}>찜한 곳이 없어요!</p>
            </Typography>
          ) : (
            <List>
              {myRestaurantList?.map((item: any) => (
                <ListItem
                  key={item._id}
                  style={{
                    padding: "8px 0",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    sx={{ wordBreak: "keep-all" }}
                    primaryTypographyProps={{
                      style: { fontWeight: "bold", textAlign: "center" },
                    }}
                    onClick={() => dispatch(setSelectedItemId(item._id))}
                  />
                  {currentUrl !== "/editor/new" && (
                    <Button
                      onClick={() => handleDeleteRestaurant(item)}
                      sx={{ color: "orange" }}
                    >
                      찜 취소
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </>
      );
    }
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            border: "2px solid #ddd",
            borderRadius: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#f5f5f5",
            maxWidth: "250px",
            maxHeight: "400px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "0.5em",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
            padding: "0.5rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.2vw" },
              position: "sticky",
              textAlign: "center",
              background: "#f5f5f5",
              zIndex: 999,
              top: 0,
              padding: "1rem",
            }}
            color="secondary.main"
            fontWeight="bold"
          >
            찜한 레스토랑
          </Typography>
          {getItems(myRestaurantList)}
        </Box>
      )}
      <MarkerModal refetch={refetch} basketData={data} />
    </>
  );
};

export default Basket;
