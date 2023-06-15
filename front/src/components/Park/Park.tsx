import React, { useEffect } from "react";
import KaKaoParkMap from "./KaKaoParkMap";
import { Box } from "@mui/material";
import SidebarPark from "./SidebarPark";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import RightbarPark from "./RightbarPark";
import { useDispatch } from "react-redux";
import { resetData } from "../../features/ParkReducer";

const Park = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetData());
  }, []);

  return (
    <div className="park-container">
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
          <SidebarPark />
        </Box>
        {width >= 1000 && (
          <Box sx={{ flex: "3", margin: "0 20px 0 20px" }}>
            <KaKaoParkMap />
          </Box>
        )}
        {width >= 600 && (
          <Box sx={{ flex: "1.7" }}>
            <RightbarPark />
          </Box>
        )}
        {width < 600 && (
          <Box sx={{ flex: "3" }}>
            <RightbarPark />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Park;
