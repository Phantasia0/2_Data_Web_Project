// @ts-nocheck

import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CommentList from "./CommentList";
import { useGetAllUserQuery } from "../../services/authApiWrapper";
import { makeStyles } from "@mui/styles";
import { fontdesign } from "../../theme/fontdesign";
import { useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { changeUserInfo } from "../../features/AuthReducer";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    objectFit: "cover",
  },
}));
const Rightbar = () => {
  const classes = useStyles();
  const { isModalVisible } = useSelector(({ profile }: RootState) => ({
    isModalVisible: profile.isModalVisible,
  }));

  const { data, isSuccess, isLoading, refetch } = useGetAllUserQuery();

  useEffect(() => {
    if (!isModalVisible) {
      refetch();
    }
  }, [isModalVisible]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography sx={fontdesign.xsText}>Our Service User</Typography>
        <AvatarGroup max={7}>
          {data &&
            data?.map((item) => (
              <Avatar
                key={item?._id}
                alt={item?._id}
                src={`http://localhost:5001/profile/${item?.profile}`}
                className={classes.avatar}
              />
            ))}
        </AvatarGroup>
        <Typography sx={fontdesign.xsText} mt={2}>
          Latest Comments
        </Typography>
        <CommentList />
      </Box>
    </Box>
  );
};

export default Rightbar;
