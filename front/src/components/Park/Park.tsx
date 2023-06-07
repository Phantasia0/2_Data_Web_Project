import React from "react";
import KaKaoParkMap from "./KaKaoParkMap";
import { Box, Stack } from "@mui/material";
import SidebarPark from "./SidebarPark";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import RightbarPark from "./RightbarPark";

const Park = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="park-container">
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
              <SidebarPark />
            </Box>
          )}
          <Box sx={{ flex: "3" }}>
            <KaKaoParkMap />
          </Box>
          {width >= 768 && (
            <Box sx={{ flex: "1.7" }}>
              <RightbarPark />
            </Box>
          )}
          {width < 768 && (
            <Box sx={{ flex: "3" }}>
              <RightbarPark />
            </Box>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Park;
