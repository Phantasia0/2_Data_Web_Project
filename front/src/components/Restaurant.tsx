import React from "react";
import KaKaoMap from "./KaKaoMap";
import Sidebar from "./Sidebar";
import { Box, Stack } from "@mui/material";
import Rightbar from "./Rightbar";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import RightbarVegan from "./RightbarVegan";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../features/configureStore";

const Restaurant = () => {
  const { width } = useWindowDimensions();
  const { keyword } = useSelector(
    ({ restaurant }: RootState) => ({
      keyword: restaurant.keyword,
    }),
    shallowEqual
  );

  const whatToDisplay = () => {
    if (keyword) {
      return (
        <>
          {width >= 768 && (
            <Box sx={{ flex: "1.7" }}>
              <Rightbar />
            </Box>
          )}
          {width < 768 && (
            <Box sx={{ flex: "3" }}>
              <Rightbar />
            </Box>
          )}
        </>
      );
    } else {
      return (
        <>
          {width >= 768 && (
            <Box sx={{ flex: "1.7" }}>
              <RightbarVegan />
            </Box>
          )}
          {width < 768 && (
            <Box sx={{ flex: "3" }}>
              <RightbarVegan />
            </Box>
          )}
        </>
      );
    }
  };

  return (
    <div className="restaurant-container">
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {width >= 1150 && (
            <Box sx={{ flex: "1" }}>
              <Sidebar />
            </Box>
          )}
          <Box sx={{ flex: "3" }}>
            <KaKaoMap />
          </Box>
          {whatToDisplay()}
        </Stack>
      </Box>
    </div>
  );
};

export default Restaurant;
