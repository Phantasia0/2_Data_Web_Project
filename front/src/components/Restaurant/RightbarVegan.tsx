import React, { useEffect, useMemo, useState } from "react";
import { Box, List, Typography, Button, Stack } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useGetRestaurantsDataQuery } from "../../services/restaurantsApi";
import { useGetRestaurantsFilteredDataQuery } from "../../services/restaurantsApi";
import RestaurantVeganItem from "./RestaurantVeganItem";
import { RootState } from "../../features/configureStore";
import { goFilteredPage, goPage } from "../../features/RestaurantReducer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import LoadingImage from "../common/Loading";

const RightbarVegan = () => {
  const { region, foodCategory, filtered, pageNumber, pageFilteredNumber } =
    useSelector(
      ({ restaurant }: RootState) => ({
        region: restaurant.region,
        foodCategory: restaurant.foodCategory,
        filtered: restaurant.filtered,
        pageNumber: restaurant.pageNumber,
        pageFilteredNumber: restaurant.pageFilteredNumber,
      }),
      shallowEqual
    );

  const {
    data,
    error,
    isLoading,
    isSuccess,
    refetch: refetchRestaurantData,
  } = useGetRestaurantsDataQuery(pageNumber as number);

  const { data: filteredData, refetch: refetchFilteredRestaurantData } =
    useGetRestaurantsFilteredDataQuery(
      {
        page: pageFilteredNumber,
        region: region,
        foodCategory: foodCategory,
      },
      {
        skip: !region,
        // @ts-ignore
        refetchOnArgChange: true,
      }
    );

  const getItemList = (filtered: Boolean | undefined) => {
    if (filtered) {
      return filteredData?.restaurant?.map((item: any) => (
        <div key={item._id}>
          <RestaurantVeganItem
            resData={item}
            refetchRestaurantData={refetchFilteredRestaurantData}
          />
        </div>
      ));
    } else {
      return data?.restaurant?.map((item: any) => (
        <div key={item._id}>
          <RestaurantVeganItem
            resData={item}
            refetchRestaurantData={refetchRestaurantData}
          />
        </div>
      ));
    }
  };

  const dispatch = useDispatch();

  const handlePrevPage = () => {
    dispatch(goPage({ pageNumber: (pageNumber as number) - 1 }));
  };

  const handleNextPage = () => {
    dispatch(goPage({ pageNumber: (pageNumber as number) + 1 }));
  };

  const handleFilterPrevPage = () => {
    dispatch(
      goFilteredPage({ pageFilteredNumber: (pageFilteredNumber as number) - 1 })
    );
  };

  const handleFilterNextPage = () => {
    dispatch(
      goFilteredPage({ pageFilteredNumber: (pageFilteredNumber as number) + 1 })
    );
  };

  if (error) {
    return <div>error</div>;
  }

  return (
    <Box
      flex={2}
      p={2}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isLoading && <LoadingImage />}
      {isSuccess && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflow: "auto",
            maxHeight: "85%",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "6px",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography
            variant="body1"
            mt={2}
            sx={{
              color: "info.main",
              fontFamily: "Nanum Gothic, sans-serif",
              fontWeight: "bold",
              backgroundColor: "rgba(60, 80, 74, 0.1)",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              비건 레스토랑이란 개인뿐만 아니라 <br></br>식물성 옵션을 탐색하고
              더 건강하고 지속 가능한 식사에 관심있는 사람들을 위한 것입니다.
            </p>
          </Typography>
          {!filtered && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Button
                disabled={pageNumber === 1}
                onClick={handlePrevPage}
                startIcon={<ChevronLeft />}
              >
                Prev
              </Button>
              <Button
                disabled={pageNumber === Math.ceil(data.total / 5)}
                onClick={handleNextPage}
                endIcon={<ChevronRight />}
              >
                Next
              </Button>
            </Stack>
          )}
          {filtered && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Button
                disabled={pageFilteredNumber === 1}
                onClick={handleFilterPrevPage}
                startIcon={<ChevronLeft />}
              >
                Prev
              </Button>
              <Button
                disabled={
                  pageFilteredNumber ===
                  Math.ceil((filteredData?.total as number) / 5)
                }
                onClick={handleFilterNextPage}
                endIcon={<ChevronRight />}
              >
                Next
              </Button>
            </Stack>
          )}
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {getItemList(filtered)}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default RightbarVegan;
