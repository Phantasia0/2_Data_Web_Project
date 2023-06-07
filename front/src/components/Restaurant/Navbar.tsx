import React, { useState } from "react";
import { AppBar, Typography, Stack, Menu, MenuItem, Link } from "@mui/material";
import { styled } from "@mui/system";

export const CustomTypography = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: "#000",
  transition: "color 0.15s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const Navbar = () => {
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAboutMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAboutMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleAboutMenuClose = () => {
    setAboutMenuOpen(false);
    setAnchorEl(null);
  };

  const handleMenuBarHover = () => {
    if (!aboutMenuOpen) {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAboutMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 9999 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "primary.main",
          width: "100%",
          fontSize: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href={"/"} underline="none">
          GreenLife
        </Link>
      </Typography>
      <Stack
        direction="row"
        spacing={20}
        sx={{ margin: "auto" }}
        onMouseEnter={handleMenuBarHover}
      >
        <CustomTypography
          onMouseEnter={handleAboutMenuOpen}
          onMouseLeave={handleAboutMenuClose}
        >
          About
          <Menu
            anchorEl={anchorEl}
            open={aboutMenuOpen}
            onClose={handleAboutMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div>
              <CustomMenuItem onClick={handleClose}>
                <Link href={"/about/greenlife"} underline="none">
                  <CustomTypography
                    sx={{ fontSize: "0.5rem", backgroundColor: "transparent" }}
                  >
                    필요성
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link href={"/about/greenservice"} underline="none">
                  <CustomTypography sx={{ fontSize: "0.5rem" }}>
                    서비스
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link href={"/about/greenresult"} underline="none">
                  <CustomTypography sx={{ fontSize: "0.5rem" }}>
                    기대효과
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
            </div>
          </Menu>
        </CustomTypography>
        <Link href={"/restaurant"} underline="none">
          <CustomTypography>Restaurant</CustomTypography>
        </Link>
        <Link href={"/park"} underline="none">
          <CustomTypography>Park</CustomTypography>
        </Link>
      </Stack>
    </AppBar>
  );
};

export default Navbar;
