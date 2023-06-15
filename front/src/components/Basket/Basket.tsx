import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import MarkerModal from "./MarkderModal";
import { useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { useGetUserBasketQuery } from "../../services/authApiWrapper";
import Button from "@mui/material/Button";
import { usePutRestaurantIntoBasketMutation } from "../../services/restaurantsApi";

const Basket = () => {
  const { data, isSuccess, isError, isLoading, isFetching, refetch } =
    useGetUserBasketQuery(undefined);

  const [addMyRestaurant] = usePutRestaurantIntoBasketMutation();

  const [myRestaurantList, setMyRestaurantList] = useState(
    data?.restaurant.map((item: any) => item.name)
  );

  useEffect(() => {
    setMyRestaurantList(data?.restaurant);
  }, []);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      const filteredRestaurants = data.restaurant;
      // .filter((restaurant: any) => items.includes(restaurant._id))
      // .map((restaurant: any) => restaurant.name);

      setMyRestaurantList(filteredRestaurants);
    }
  }, [isFetching, isSuccess]);

  const handleDeleteRestaurant = async (item: any) => {
    const success = await addMyRestaurant(item._id).unwrap();
    if (success) {
      refetch();
    }
  };

  const getItems = (myRestaurantList: any) => {
    if (!isFetching && isSuccess) {
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
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      style: { fontWeight: "bold", textAlign: "center" },
                    }}
                  />
                  <Button
                    onClick={() => handleDeleteRestaurant(item)}
                    sx={{ color: "orange" }}
                  >
                    취소
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        border: "2px solid #ddd",
        borderRadius: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#f5f5f5",
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
      }}
    >
      <MarkerModal refetch={refetch} basketData={data} />
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
  );
};

export default Basket;
