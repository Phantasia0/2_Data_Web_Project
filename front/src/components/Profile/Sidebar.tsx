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
  Stack,
  Switch,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { goPage } from "../../features/ProfileReducer";

const Sidebar = () => {
  const { pageNumber, total } = useSelector(({ profile }: RootState) => ({
    pageNumber: profile.pageNumber,
    total: profile.total,
  }));

  const dispatch = useDispatch();

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
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="프로필 수정" />
            </ListItemButton>
          </ListItem>
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
    </Box>
  );
};

export default Sidebar;
