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
import { goFilteredPage } from "../../features/ParkReducer";
import LoadingImage from "../common/Loading";

const RightbarPark = () => {
  const { region, filtered, pageNumber, pageFilteredNumber } = useSelector(
    ({ park }: RootState) => ({
      region: park.region,
      filtered: park.filtered,
      pageNumber: park.pageNumber,
      pageFilteredNumber: park.pageFilteredNumber,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { data, error, isLoading, isSuccess } = useGetParksDataQuery(
    pageNumber as number
  );

  const { data: filteredData } = useGetParksFilteredDataQuery(
    {
      page: pageFilteredNumber,
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
      return filteredData?.park?.map((item: any) => (
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
              공원에서 자연의 소중함을 느껴보세요.
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

export default RightbarPark;
