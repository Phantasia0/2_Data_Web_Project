import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  filterBySelected,
  removeSelected,
} from "../../features/ActivityReducer";
import { RootState } from "../../features/configureStore";

interface LabelButtonProps {
  label: string;
  able: Boolean;
}

const LabelButton: FC<LabelButtonProps> = ({ label, able }) => {
  const { categories } = useSelector(
    ({ activity }: RootState) => ({
      categories: activity.categories,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<Boolean>(
    categories?.includes(label) || true
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isClicked) {
      dispatch(filterBySelected(label));
    } else {
      dispatch(removeSelected(label));
    }
    setIsClicked(!isClicked);
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      disabled={!able}
      sx={{
        backgroundColor: isClicked ? "primary.main" : "initial",
        color: isClicked ? "white" : "primary.main",
        fontWeight: "bold",
        "&:hover": !isClicked
          ? {
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "bold",
            }
          : {
              backgroundColor: "white",
              color: "primary.main",
              fontWeight: "bold",
            },
      }}
    >
      {label}
    </Button>
  );
};

export default LabelButton;
