import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { useGetUserBasketQuery } from "../../services/authApiWrapper";
import Button from "@mui/material/Button";
import {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
  usePutParkIntoBasketMutation,
} from "../../services/parksApi";
import MarkderModalPark from "./MarkderModalPark";
import {
  resetSelectedItemId,
  setSelectedItemId,
} from "../../features/BasketParkReducer";
import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { RootState } from "../../features/configureStore";
import { setIsClicked } from "../../features/BasketParkReducer";

const BasketPark = () => {
  const dispatch = useDispatch();

  const { data, isSuccess, isError, isLoading, isFetching, refetch } =
    useGetUserBasketQuery(undefined);

  const user = useSelector(selectCurrentUser);

  const [addMyPark] = usePutParkIntoBasketMutation();

  const [myParkList, setMyParkList] = useState(
    data?.park.map((item: any) => item.name)
  );

  const currentUrl = window.location.pathname;

  useEffect(() => {
    setMyParkList(data?.park);
  }, []);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      const filteredParks = data?.park;
      setMyParkList(filteredParks);
    }
  }, [isFetching, isSuccess]);

  const { isClicked, basketItem }: { isClicked: boolean; basketItem: any } =
    useSelector(({ basketPark }: RootState) => ({
      // @ts-ignore
      isClicked: basketPark.isClicked,
      // @ts-ignore
      basketItem: basketPark.item,
    }));

  const { region, pageNumber, filtered, pageFilteredNumber } = useSelector(
    ({ park }: RootState) => ({
      region: park.region,
      pageNumber: park.pageNumber,
      filtered: park.filtered,
      pageFilteredNumber: park.pageFilteredNumber,
    }),
    shallowEqual
  );

  const { refetch: refetchParksData } = useGetParksDataQuery(
    pageNumber as number,
    { skip: !isClicked }
  );

  const { refetch: refetchFilteredParkData } = useGetParksFilteredDataQuery(
    {
      page: pageFilteredNumber,
      region: region,
    },
    {
      skip: !isClicked,
    }
  );

  const handleDeletePark = async (item: any) => {
    dispatch(setIsClicked(true));
    const success = await addMyPark(item._id).unwrap();
    if (success) {
      dispatch(setIsClicked(false));
      refetch();
      if (filtered) {
        refetchFilteredParkData();
      } else {
        refetchParksData();
      }
    }
  };

  const getItems = (myParkList: any) => {
    if (!isFetching && isSuccess) {
      if (myParkList?.length === 0) {
        dispatch(resetSelectedItemId());
      }

      return (
        <>
          {myParkList?.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1.2vw", wordBreak: "keep-all" } }}
              component="span"
              color="secondary.main"
              fontWeight="bold"
            >
              <p style={{ textAlign: "center" }}>찜한 곳이 없어요!</p>
            </Typography>
          ) : (
            <List>
              {myParkList?.map((item: any) => (
                <ListItem
                  key={item._id}
                  style={{
                    padding: "8px 0",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    sx={{ wordBreak: "keep-all" }}
                    primaryTypographyProps={{
                      style: { fontWeight: "bold", textAlign: "center" },
                    }}
                    onClick={() => dispatch(setSelectedItemId(item._id))}
                  />
                  {currentUrl !== "/editor/new" && (
                    <Button
                      onClick={() => handleDeletePark(item)}
                      sx={{ color: "orange" }}
                    >
                      찜 취소
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </>
      );
    }
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            border: "2px solid #ddd",
            borderRadius: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#f5f5f5",
            maxWidth: "250px",
            maxHeight: "400px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "0.5em",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
            padding: "0.5rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.2vw" },
              position: "sticky",
              textAlign: "center",
              background: "#f5f5f5",
              zIndex: 999,
              top: 0,
              padding: "1rem",
            }}
            color="secondary.main"
            fontWeight="bold"
          >
            찜한 공원
          </Typography>
          {getItems(myParkList)}
        </Box>
      )}

      <MarkderModalPark refetch={refetch} basketData={data} />
    </>
  );
};

export default BasketPark;
