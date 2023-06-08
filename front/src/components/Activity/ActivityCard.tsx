import React, { FC } from "react";
import { Activity } from "../../models/activity.model";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
interface ActivityCardProps {
  data: Activity;
}

const ActivityCard: FC<ActivityCardProps> = ({ data }) => {
  const { name, CO2_reduction, cost_reduction, tree_effect, icon } = data;

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        height: "300px",
        border: "1px solid primary.main",
        borderRadius: "1rem",
      }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          position: "absolute",
          top: "10px",
          color: "primary.main",
          wordBreak: "keep-all",
          lineBreak: "strict",
          width: "100%",
        }}
      >
        <center>{name}</center>
      </Typography>
      <CardMedia
        component="img"
        image={icon}
        alt={name}
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
        }}
      />
      <CardContent
        sx={{
          position: "absolute",
          width: "100%",
          top: "70%",
        }}
      >
        <Typography variant="body2">
          <center>탄소 배출량: {CO2_reduction}</center>
        </Typography>
        <Typography variant="body2">
          <center>비용: {cost_reduction}</center>
        </Typography>
        <Typography variant="body2">
          <center>효과: {tree_effect}</center>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
