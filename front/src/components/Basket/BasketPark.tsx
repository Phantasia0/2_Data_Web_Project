import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import MarkerModal from "./MarkderModal";
import { useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { useGetUserBasketQuery } from "../../services/authApiWrapper";
import Button from "@mui/material/Button";
import { usePutParkIntoBasketMutation } from "../../services/parksApi";
import MarkderModalPark from "./MarkderModalPark";
import { setSelectedItemId } from "../../features/BasketParkReducer";
import { useDispatch } from "react-redux";

const BasketPark = () => {
  const dispatch = useDispatch();

  const { data, isSuccess, isError, isLoading, isFetching, refetch } =
    useGetUserBasketQuery(undefined);

  const [addMyPark] = usePutParkIntoBasketMutation();

  const [myParkList, setMyParkList] = useState(
    data?.park.map((item: any) => item.name)
  );

  useEffect(() => {
    setMyParkList(data?.park);
  }, []);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      const filteredParks = data?.park;
      setMyParkList(filteredParks);
    }
  }, [isFetching, isSuccess]);

  const handleDeletePark = async (item: any) => {
    const success = await addMyPark(item._id).unwrap();
    if (success) {
      refetch();
    }
  };

  const getItems = (myParkList: any) => {
    if (!isFetching && isSuccess) {
      return (
        <>
          {myParkList?.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1.2vw" } }}
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
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      style: { fontWeight: "bold", textAlign: "center" },
                    }}
                    onClick={() => dispatch(setSelectedItemId(item._id))}
                  />
                  <Button
                    onClick={() => handleDeletePark(item)}
                    sx={{ color: "orange" }}
                  >
                    취소
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        border: "2px solid #ddd",
        borderRadius: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#f5f5f5",
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
      }}
    >
      <MarkderModalPark refetch={refetch} basketData={data} />
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
  );
};

export default BasketPark;
