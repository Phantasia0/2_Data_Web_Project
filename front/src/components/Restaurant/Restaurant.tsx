import React, { useEffect } from "react";
import KaKaoMap from "./KaKaoMap";
import Sidebar from "./Sidebar";
import { Box, Stack } from "@mui/material";
import Rightbar from "./Rightbar";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import RightbarVegan from "./RightbarVegan";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { useDispatch } from "react-redux";
import { resetData } from "../../features/RestaurantReducer";

const Restaurant = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { keyword } = useSelector(
    ({ restaurant }: RootState) => ({
      keyword: restaurant.keyword,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(resetData());
  }, []);

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
          {width >= 600 && (
            <Box sx={{ flex: "1.7" }}>
              <RightbarVegan />
            </Box>
          )}
          {width < 600 && (
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
          display: width < 600 ? "" : "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ flex: "1" }}>
          <Sidebar />
        </Box>
        {width >= 1000 && (
          <Box sx={{ flex: "3", margin: "0 20px 0 20px" }}>
            <KaKaoMap />
          </Box>
        )}
        {whatToDisplay()}
      </Box>
    </div>
  );
};

export default Restaurant;
