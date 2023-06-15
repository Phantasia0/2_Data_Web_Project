import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import { addThisItem, setIsClicked } from "../../features/BasketParkReducer";
import { usePutParkIntoBasketMutation } from "../../services/parksApi";
import KaKaoParkRoadView from "../Editor/KaKaoParkRoadView";
import { selectCurrentUser } from "../../features/AuthReducer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const MarkModalPark = ({ refetch, basketData }: any) => {
  const dispatch = useDispatch();
  const { isClicked, basketItem }: { isClicked: boolean; basketItem: any } =
    useSelector(({ basketPark }: RootState) => ({
      // @ts-ignore
      isClicked: basketPark.isClicked,
      // @ts-ignore
      basketItem: basketPark.item,
    }));

  const user = useSelector(selectCurrentUser);

  const [addMyRestaurant, { data, isSuccess, isError, isLoading }] =
    usePutParkIntoBasketMutation();

  const handleClose = () => {
    dispatch(setIsClicked(false));
  };

  const handlePark = async () => {
    const success = await addMyRestaurant(basketItem._id).unwrap();
    if (success) {
      dispatch(
        addThisItem({
          data: basketItem,
        })
      );
      dispatch(setIsClicked(false));
      refetch();
    }
  };

  return (
    <Dialog
      open={isClicked}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiDialogTitle-root": { textAlign: "center" } }}
    >
      <DialogTitle>
        {basketItem?.name}
        <IconButton
          sx={{ fontSize: "15px", fontWeight: "blod" }}
          // onClick={handleMyRestaurant}
        >
          <Checkbox
            icon={<FavoriteBorder sx={{ fontSize: "1rem" }} />}
            checkedIcon={<Favorite sx={{ color: "red", fontSize: "1rem" }} />}
            checked={basketItem?.contactCheck}
            disabled={false}
          />
          {basketItem?.contactCount + "찜"}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <KaKaoParkRoadView spotData={basketItem} />
        <Typography variant="subtitle1">주소: {basketItem?.address}</Typography>
        <Typography variant="subtitle1">전화번호: {basketItem?.tel}</Typography>
        <Typography variant="subtitle1">지역: {basketItem?.region}</Typography>
      </DialogContent>
      {user && (
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handlePark} color="primary" variant="contained">
            {basketData &&
            basketData?.park?.some((item: any) => item._id === basketItem._id)
              ? "찜 취소"
              : "찜하기"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MarkModalPark;
