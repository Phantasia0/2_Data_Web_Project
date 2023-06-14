// @ts-nocheck

import {
  AccountBox,
  Article,
  ChevronLeft,
  ChevronRight,
  Home,
  ModeNight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { goPage } from "../../features/ProfileReducer";
import ProfileEditor from "./ProfileEdittor";

const Sidebar = () => {
  const { pageNumber, total } = useSelector(({ profile }: RootState) => ({
    pageNumber: profile.pageNumber,
    total: profile.total,
  }));

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<any>("");
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePrevPage = (e: any) => {
    dispatch(goPage({ pageNumber: (pageNumber as number) - 1 }));
  };

  const handleNextPage = (e: any) => {
    dispatch(goPage({ pageNumber: (pageNumber as number) + 1 }));
  };

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="홈" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/community">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="커뮤니티" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={showModal}>
            <ListItemButton component="a">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="프로필 수정" />
            </ListItemButton>
          </ListItem>
          {showModal && (
            <ProfileEditor
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
            />
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Button
              disabled={pageNumber === 1}
              onClick={handlePrevPage}
              startIcon={<ChevronLeft />}
            >
              Prev
            </Button>
            <Button
              disabled={pageNumber === Math.ceil(total / 12)}
              onClick={handleNextPage}
              endIcon={<ChevronRight />}
            >
              Next
            </Button>
          </Stack>
        </List>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          sx: { backgroundColor: "primary.main" },
        }}
      />
    </Box>
  );
};

export default Sidebar;
