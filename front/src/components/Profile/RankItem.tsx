// @ts-nocheck
import React from "react";
import { Box, List, ListItem, Typography, styled } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { searchKeyword } from "../../features/ProfileReducer";
import { useDispatch } from "react-redux";

const StyledListItem = styled(ListItem)(({ index }: any) => {
  let borderColor;
  let hoverBackgroundColor;

  if (index === 0) {
    borderColor = "#ffd700";
    hoverBackgroundColor = "#ffe79e";
  } else if (index === 1) {
    borderColor = "#c0c0c0";
    hoverBackgroundColor = "#e6e6e6";
  } else if (index === 2) {
    borderColor = "#cd7f32";
    hoverBackgroundColor = "#dca77a";
  }

  return {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    border: `2px solid ${borderColor}`,
    borderRadius: "1rem",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: hoverBackgroundColor,
      cursor: "pointer",
    },
  };
});

const RankItem = ({ data, index }: { data: any; index: number }) => {
  const dispatch = useDispatch();
  const handleClick = (keyword) => {
    dispatch(
      searchKeyword({
        keyword: keyword,
      })
    );
  };

  return (
    <StyledListItem index={index} onClick={() => handleClick(data.nickname)}>
      <EmojiEvents
        style={{
          color: index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32",
          marginRight: "2rem",
        }}
      />
      <Box>
        <Typography variant="body2" color="text.primary">
          {index === 0 ? (
            <strong>
              그린왕 <span style={{ fontSize: "1.2em" }}>{data.nickname}</span>
            </strong>
          ) : (
            <span style={{ fontSize: "1.2em" }}>{data.nickname}</span>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Post:</span> {data.post}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Comment:</span> {data.comment}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ color: "#ff0000", fontWeight: "bold" }}>Likes:</span>{" "}
          {data.follow}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: "bold" }}>Score:</span>{" "}
          <strong>{data.score}</strong>
        </Typography>
      </Box>
    </StyledListItem>
  );
};

export default RankItem;
