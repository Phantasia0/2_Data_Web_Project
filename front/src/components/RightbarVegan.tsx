import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { useGetRestaurantsDataQuery } from "../services/restaurantsApi";
import { useGetRestaurantsFilteredDataQuery } from "../services/restaurantsApi";
import RestaurantVeganItem from "./RestaurantVeganItem";
import { RootState } from "../features/configureStore";

const RightbarVegan = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRestaurantsDataQuery();

  const { region, foodCategory } = useSelector(
    ({ restaurant }: RootState) => ({
      region: restaurant.region,
      foodCategory: restaurant.foodCategory,
    }),
    shallowEqual
  );

  const { data: filteredData } = useGetRestaurantsFilteredDataQuery({
    region: region,
    foodCategory: foodCategory,
  });

  const getItemList = (data: any) =>
    data.map((item: any) => (
      <div key={item._id}>
        <RestaurantVeganItem data={item} />
      </div>
    ));

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      {isLoading && <div>...Loading</div>}
      {isFetching && <div>...Fetching</div>}
      {error && <div>...Error</div>}
      {isSuccess && (
        <Box
          position="fixed"
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflow: "auto",
            maxHeight: "70%",
          }}
        >
          <Typography variant="h6" fontWeight={100} mt={2}>
            너에게 추천할께. 비건
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {!filteredData && getItemList(data?.restaurant)}
            {filteredData && filteredData?.length > 0 ? (
              getItemList(filteredData)
            ) : (
              <div>데이터가 없습니다.</div>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default RightbarVegan;
