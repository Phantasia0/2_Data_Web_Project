import React, { useMemo, useState } from "react";
import { Box, List, Typography, Button, Stack } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
} from "../../services/parksApi";
import ParkItem from "./ParkItem";
import { RootState } from "../../features/configureStore";

import { goPage } from "../../features/ParkReducer";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const RightbarPark = () => {
  const { region, filtered, pageNumber } = useSelector(
    ({ park }: RootState) => ({
      region: park.region,
      filtered: park.filtered,
      pageNumber: park.pageNumber,
    }),
    shallowEqual
  );

  const { data, error, isLoading, isSuccess } = useGetParksDataQuery(
    pageNumber as number
  );

  const { data: filteredData } = useGetParksFilteredDataQuery(
    {
      region: region,
    },
    {
      skip: !region,
      // @ts-ignore
      refetchOnArgChange: true,
    }
  );

  const getItemList = (filtered: Boolean | undefined) => {
    if (filtered) {
      return filteredData?.map((item: any) => (
        <div key={item._id}>
          <ParkItem data={item} />
        </div>
      ));
    } else {
      return data?.park?.map((item: any) => (
        <div key={item._id}>
          <ParkItem data={item} />
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

  if (error) {
    return <div>error</div>;
  }

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      {isLoading && <div>...Loading</div>}
      {isSuccess && (
        <Box
          position="fixed"
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflow: "auto",
            maxHeight: "70%",
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
          <Typography variant="body1" mt={2}
          sx={{color:"info.main",
          fontFamily: "Nanum Gothic, sans-serif",
          fontWeight: "bold"}}>
            <center>공원에서 자연의 소중함을 느껴보세요.</center>
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
                disabled={pageNumber === Math.ceil(data.total / 5)} // 총 페이지 수에 맞게 수정
                onClick={handleNextPage}
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

export default RightbarPark;
