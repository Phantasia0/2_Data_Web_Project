import React from "react";
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
import { addThisItem, setIsClicked } from "../../features/BasketReducer";
import { usePutRestaurantIntoBasketMutation } from "../../services/restaurantsApi";
import { selectCurrentUser } from "../../features/AuthReducer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const MarkerModal = ({ refetch, basketData }: any) => {
  const dispatch = useDispatch();
  const { isClicked, basketItem }: { isClicked: boolean; basketItem: any } =
    useSelector(({ basket }: RootState) => ({
      // @ts-ignore
      isClicked: basket.isClicked,
      // @ts-ignore
      basketItem: basket.item,
    }));

  const user = useSelector(selectCurrentUser);

  const [addMyRestaurant, { data, isSuccess, isError, isLoading }] =
    usePutRestaurantIntoBasketMutation();

  const handleClose = () => {
    dispatch(setIsClicked(false));
  };

  const handleMyRestaurant = async () => {
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
      sx={{
        "& .MuiDialogTitle-root": { textAlign: "center" },
        marginTop: 20,
      }}
    >
      <DialogTitle>
        {basketItem?.name}{" "}
        <IconButton
          sx={{ fontSize: "15px", fontWeight: "blod" }}
          onClick={handleMyRestaurant}
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
        <img
          src={basketItem?.image}
          alt={basketItem?.name}
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
        />
        <DialogContentText>{basketItem?.description}</DialogContentText>
        <Typography variant="subtitle1">주소: {basketItem?.address}</Typography>
        <Typography variant="subtitle1">
          카테고리: {basketItem?.category}
        </Typography>
        <Typography variant="subtitle1">전화번호: {basketItem?.tel}</Typography>
        <Typography variant="subtitle1">지역: {basketItem?.region}</Typography>
      </DialogContent>
      {user && (
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleMyRestaurant}
            color="primary"
            variant="contained"
          >
            {basketData &&
            basketData?.restaurant?.some(
              (item: any) => item._id === basketItem._id
            )
              ? "찜 취소"
              : "찜하기"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MarkerModal;
