import { Box, List, Typography } from "@mui/material";
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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: "30%",
        }}
      >
        <Typography variant="h6" fontWeight={100} mt={2}>
          <p style={{ textAlign: "center" }}>너에게 추천할께</p>
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "700px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
          }}
        >
          {getItemList(data)}
        </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
