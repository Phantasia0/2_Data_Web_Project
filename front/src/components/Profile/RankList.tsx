import React from "react";
import { useGetRankListQuery } from "../../services/profileApi";
import { Box, List, Typography } from "@mui/material";
import { fontdesign } from "../../theme/fontdesign";
import RankItem from "./RankItem";

const RankList = () => {
  const { data, isSuccess, isFetching, isLoading, isError } =
    useGetRankListQuery(undefined);

  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={fontdesign.xsText}>RankList</Typography>
      <List>
        {isSuccess &&
          !isFetching &&
          data
            ?.slice(0, 3)
            .map((item: any, index: number) => (
              <RankItem data={item} key={item._id} index={index} />
            ))}
      </List>
    </Box>
  );
};

export default RankList;
