import { Home, Search, ArrowDropDown, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import {
  filterBySelected,
  resetData,
  searchKeyword,
} from "../../features/RestaurantReducer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { RootState } from "../../features/configureStore";
import { CustomTypography } from "../common/Navbar";
import Paper from "@mui/material/Paper";

const regionCategory: string[] = [
  "경기도",
  "경상남도",
  "경상북도",
  "광주광역시",
  "대구광역시",
  "부산광역시",
  "서울특별시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전라북도",
  "제주특별자치도",
  "충청북도",
];

const foodCategory: string[] = [
  "샐러드",
  "술집",
  "양식",
  "인도음식",
  "중식",
  "카페",
  "퓨전음식",
  "한식",
];

const Sidebar = () => {
  const [regionOpen, setRegionOpen] = useState<Boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [foodOpen, setFoodOpen] = useState<Boolean>(false);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorFoodEl, setAnchorFoodEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();
  const { keyword } = useSelector(
    ({ restaurant }: RootState) => ({
      keyword: restaurant.keyword,
    }),
    shallowEqual
  );

  const open = Boolean(anchorEl);
  const openFood = Boolean(anchorFoodEl);

  const handleRegionOpenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setRegionOpen(!regionOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleRegionOpenClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(null);
  };

  const handleFoodOpenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFoodOpen(!foodOpen);
    setAnchorFoodEl(event.currentTarget);
  };

  const handleFoodOpenClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorFoodEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debounceOnChangeKeyword(event.target.value);
  };

  const debounceKeywordSearch = (keyword: string) => {
    dispatch(
      searchKeyword({
        keyword: keyword,
      })
    );
  };

  const DEBOUNCE_DELAY: number = 300;

  const debounceOnChangeKeyword = useCallback(
    debounce(debounceKeywordSearch, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    dispatch(
      filterBySelected({
        region: selectedRegion,
        foodCategory: selectedFood,
      })
    );
  }, [dispatch, selectedRegion, selectedFood]);

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: {
          xs: "none",
          sm: "block",
          width: "100%",
          "@media (max-width: 1080px)": {
            display: "none",
          },
        },
      }}
    >
      <Box position="fixed">
        <TextField
          variant="outlined"
          placeholder="키워드 검색"
          fullWidth
          
          size="small"
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{
            width: "80%",
            "@media (max-width: 768px)": {
              display: "none",
            },
            marginLeft: '1.5rem',
            marginTop: '1rem',
          }}
          value={searchValue}
          onChange={handleSearchChange}
        />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleRegionOpenClick}>
              <ListItemIcon>
                <ArrowDropDown />
              </ListItemIcon>
              <ListItemText
                primary={selectedRegion ? selectedRegion : "지역 선택"}
                primaryTypographyProps={{ style: { fontWeight: 'bold', marginLeft:'0.5rem'} }}
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
                    <ListItem key={region} disablePadding>
                      <div
                        onClick={() => {
                          setSelectedRegion(region);
                          setAnchorEl(null);
                        }}
                      >
                        <CustomTypography style={{ fontFamily: "NanumSquare, sans-serif", fontWeight: "bold"}}>{region}</CustomTypography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Popover>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleFoodOpenClick}>
              <ListItemIcon>
                <ArrowDropDown />
              </ListItemIcon>
              <ListItemText
                primary={selectedFood ? selectedFood : "종류 선택"}
                primaryTypographyProps={{ style: { fontWeight: 'bold', marginLeft:'0.5rem' } }}
              />
            </ListItemButton>
            <Popover
              open={openFood}
              anchorEl={anchorFoodEl}
              onClose={handleFoodOpenClose}
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
                  {foodCategory.map((food) => (
                    <ListItem key={food} disablePadding>
                      <div
                        onClick={() => {
                          setSelectedFood(food);
                          setAnchorFoodEl(null);
                        }}
                      >
                        <CustomTypography style={{ fontFamily: "NanumSquare, sans-serif", fontWeight: "bold"}}>{food}</CustomTypography>
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
                setSelectedFood("");
                setSelectedRegion("");
              }}
            >
              <ListItemIcon>
                <RestartAlt />
              </ListItemIcon>
              <ListItemText primary="초기화" primaryTypographyProps={{ style: { fontWeight: 'bold' }, marginLeft:'0.8rem' }}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
