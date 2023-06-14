import { Home, Search, ArrowDropDown, RestartAlt } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  filterBySelected,
  resetData,
  resetFilterPage,
} from "../../features/ParkReducer"; // <<
import { useDispatch } from "react-redux";
import { CustomTypography } from "../common/Navbar";
import Paper from "@mui/material/Paper";

const regionCategory: string[] = [
  "강원도",
  "경기도",
  "경상남도",
  "경상북도",
  "광주광역시",
  "대구광역시",
  "대전광역시",
  "부산광역시",
  "서울특별시",
  "세종특별자치시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전라북도",
  "제주특별자치도",
  "충청남도",
  "충청북도",
];

const SidebarPark = () => {
  const [regionOpen, setRegionOpen] = useState<Boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleRegionOpenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setRegionOpen(!regionOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleRegionOpenClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(
      filterBySelected({
        region: selectedRegion,
      })
    );
  }, [dispatch, selectedRegion]);

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
      // position="fixed"
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleRegionOpenClick}>
              <ListItemIcon>
                <ArrowDropDown />
              </ListItemIcon>
              <ListItemText
                primary={selectedRegion ? selectedRegion : "지역 선택"}
                primaryTypographyProps={{
                  style: { fontWeight: "bold" },
                  marginLeft: "0.5rem",
                }}
              />
            </ListItemButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleRegionOpenClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{ width: "100%", display: "block" }}
            >
              <Paper>
                <List>
                  {regionCategory.map((region) => (
                    <ListItem key={region}>
                      <div
                        onClick={() => {
                          setSelectedRegion(region);
                          setAnchorEl(null);
                          dispatch(resetFilterPage());
                        }}
                      >
                        <CustomTypography
                          style={{
                            fontFamily: "NanumSquare, sans-serif",
                            fontWeight: "bold",
                            padding: "0.05vw",
                          }}
                        >
                          {region}
                        </CustomTypography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Popover>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(resetData());
                setSelectedRegion(null);
              }}
            >
              <ListItemIcon>
                <RestartAlt />
              </ListItemIcon>
              <ListItemText
                primary="초기화"
                primaryTypographyProps={{
                  style: { fontWeight: "bold" },
                  marginLeft: "0.8rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SidebarPark;
