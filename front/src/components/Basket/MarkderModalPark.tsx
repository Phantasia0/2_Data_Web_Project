import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../../features/configureStore";
import { addThisItem, setIsClicked } from "../../features/BasketParkReducer";
import {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
  usePutParkIntoBasketMutation,
} from "../../services/parksApi";
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

  const { region, pageNumber, filtered, pageFilteredNumber } = useSelector(
    ({ park }: RootState) => ({
      region: park.region,
      pageNumber: park.pageNumber,
      filtered: park.filtered,
      pageFilteredNumber: park.pageFilteredNumber,
    }),
    shallowEqual
  );

  const user = useSelector(selectCurrentUser);

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
      if (filtered) {
        refetchFilteredParkData();
      } else {
        refetchParksData();
      }
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
      <DialogTitle>{basketItem?.name}</DialogTitle>
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
