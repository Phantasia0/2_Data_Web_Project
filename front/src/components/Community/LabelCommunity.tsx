import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { useNavigate } from "react-router-dom";

const LabelCommunity = ({ label }: any) => {
  const navigate = useNavigate();

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
    setIsClicked(!isClicked);
  };

  const handleAddPostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/editor/new");
  };

  if (label === "새 글 작성") {
    return (
      <Button
        variant="outlined"
        onClick={handleAddPostClick}
        sx={{
          borderRadius: "1rem",
          color: "primary.main",
          fontSize: {
            xs: "1vw",
          },
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
        }}
      >
        {label}
      </Button>
    );
  } else {
    return (
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          backgroundColor: isClicked ? "primary.main" : "initial",
          borderRadius: "1rem",
          color: isClicked ? "white" : "primary.main",
          fontSize: {
            xs: "1vw",
          },
          "&:hover": !isClicked
            ? {
                backgroundColor: "primary.main",
                color: "white",
              }
            : {
                backgroundColor: "white",
                color: "primary.main",
              },
        }}
      >
        {label}
      </Button>
    );
  }
};

export default LabelCommunity;
