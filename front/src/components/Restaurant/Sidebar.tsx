import { Search, ArrowDropDown, RestartAlt } from "@mui/icons-material";
import {
  Box,
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
  resetFilterPage,
  resetFood,
  searchKeyword,
  setFoodCategoryList,
} from "../../features/RestaurantReducer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { RootState } from "../../features/configureStore";
import { CustomTypography } from "../common/Navbar";
import Paper from "@mui/material/Paper";
import { useGetRestaurantsFilteredDataQuery } from "../../services/restaurantsApi";
import Basket from "../Basket/Basket";
import { resetItem } from "../../features/BasketReducer";

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

const Sidebar = () => {
  const [regionOpen, setRegionOpen] = useState<Boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [foodOpen, setFoodOpen] = useState<Boolean>(false);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorFoodEl, setAnchorFoodEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();
  const { keyword, foodCategoryList, region, foodCategory, filtered } =
    useSelector(
      ({ restaurant }: RootState) => ({
        keyword: restaurant.keyword,
        foodCategoryList: restaurant.foodCategoryList,
        region: restaurant.region,
        foodCategory: restaurant.foodCategory,
        filtered: restaurant.filtered,
      }),
      shallowEqual
    );

  const { data, isSuccess, isFetching } = useGetRestaurantsFilteredDataQuery(
    {
      page: 1,
      region: region,
    },
    {
      skip: !region,
      // @ts-ignore
      refetchOnArgChange: true,
    }
  );

  useEffect(() => {
    if (filtered) {
      setSearchValue("");
    }
  }, [filtered]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      dispatch(setFoodCategoryList(data?.category));
    }
  }, [isSuccess, isFetching]);

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
          width: "100%",

          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Box>
        <TextField
          variant="outlined"
          placeholder="리뷰를 검색해보세요"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{
            width: "80%",
            maxWidth: "350px",
            marginLeft: "1.5rem",
            marginTop: "1rem",
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
                primaryTypographyProps={{
                  style: { fontWeight: "bold", marginLeft: "0.5rem" },
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
                          setSelectedFood(null);
                          dispatch(resetFood());
                        }}
                      >
                        <CustomTypography
                          style={{
                            fontFamily: "NanumSquare, sans-serif",
                            fontWeight: "bold",
                            padding: "0.1vw",
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
            {filtered && (
              <ListItemButton onClick={handleFoodOpenClick}>
                <ListItemIcon>
                  <ArrowDropDown />
                </ListItemIcon>
                <ListItemText
                  primary={foodCategory ? foodCategory : "종류 선택"}
                  primaryTypographyProps={{
                    style: { fontWeight: "bold", marginLeft: "0.5rem" },
                  }}
                />
              </ListItemButton>
            )}
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
                  {foodCategoryList &&
                    foodCategoryList?.map((food) => (
                      <ListItem key={food}>
                        <div
                          onClick={() => {
                            setSelectedFood(food);
                            setAnchorFoodEl(null);
                            dispatch(resetFilterPage());
                          }}
                        >
                          <CustomTypography
                            style={{
                              fontFamily: "NanumSquare, sans-serif",
                              fontWeight: "bold",
                              padding: "0.1vw",
                            }}
                          >
                            {food}
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
                setSelectedFood("");
                setSelectedRegion("");
                dispatch(resetItem());
                setSearchValue("");
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
        <Basket />
      </Box>
    </Box>
  );
};

export default Sidebar;
