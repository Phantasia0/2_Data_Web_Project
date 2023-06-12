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
import React from "react";

import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import RestaurantItem from "./RestaurantItem";
import { RestaurantState } from "../../features/RestaurantReducer";

const Rightbar = () => {
  const { data } = useSelector(
    ({ restaurant }: RootState) => ({
      data: restaurant.data,
    }),
    shallowEqual
  );

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  const getItemList = (data: RestaurantState["data"]) =>
    data.map((item: any) => (
      <div key={item.id}>
        <RestaurantItem data={item} />
      </div>
    ));

  return (
    <Box
      flex={2}
      p={2}
      sx={{
        // display: {
        //   xs: "none",
        //   sm: "block",
        // },
        display: "flex",
        justifyContent: "center",
      }}
    >
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
          <center>너에게 추천할께</center>
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {getItemList(data)}
        </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
