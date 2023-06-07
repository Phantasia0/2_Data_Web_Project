import React from "react";
import { Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Rating = ({ value }: { value: number }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < value) {
        stars.push(<StarIcon key={i} sx={{ color: "orange" }} />);
      } else {
        stars.push(<StarIcon key={i} sx={{ color: "disabled" }} />);
      }
    }
    return stars;
  };

  return (
    <Box display="flex" alignItems="center">
      {renderStars()}
      <Typography variant="body1" ml={1}>
        {value}/5
      </Typography>
    </Box>
  );
};

export default Rating;
