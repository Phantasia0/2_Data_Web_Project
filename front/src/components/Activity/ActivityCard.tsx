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
        component="div"
        sx={{
          position: "absolute",
          top: "30px",
          color: "primary.main",
          wordBreak: "keep-all",
          lineBreak: "strict",
          width: "100%",
          fontWeight: "bold",
          fontSize: {xs: "10px", sm: "12px", md: "14px", lg:"16px"},
          whiteSpace: "nowrap",
          fontFamily: "NanumSquareExtraBold, sans-serif",
        }}
        // sx={{
        //   fontSize: {xs: "2vw"},
        //   lineHeight: { xs: "2.2vw" },
        //   color: "primary.main",
        //   whiteSpace: "nowrap",
        //   marginTop: "2vw",
        //   fontFamily: "NanumSquareExtraBold, sans-serif"
        // }},
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
          top: "66%",
          left: "-6%",
        }}
      >
        <Typography variant="body2" fontWeight='bold' color='info.main' sx={{fontSize: {xs: "10px", sm: "12px", md: "14px", lg:"16px"}}}>
          <center>탄소 배출량: {CO2_reduction}</center>
        </Typography>
        <Typography variant="body2" fontWeight='bold' color='info.main' sx={{fontSize: {xs: "10px", sm: "12px", md: "14px", lg:"16px"}}}>
          <center>비용: {cost_reduction}</center>
        </Typography>
        <Typography variant="body2" fontWeight='bold' color='info.main' sx={{fontSize: {xs: "10px", sm: "12px", md: "14px", lg:"16px"}}}>
          <center>효과: {tree_effect}</center>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
