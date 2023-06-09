import React, { useState } from "react";
import { AppBar, Typography, Stack, Menu, MenuItem, Link } from "@mui/material";
import { styled } from "@mui/system";
import { info } from "console";

export const CustomTypography = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.info.main,
  transition: "color 0.15s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  fontFamily: "Black Han Sans, sans-serif",
  fontWeight: "light"
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
          marginTop: '2rem',
          marginBottom: "2rem"
        }}
        
      >
        <Link href={"/"} 
        underline="none"
        sx={{
          fontFamily: "Black Han Sans, sans-serif"}}>
          <img
          src={require("../../assets/images/tree.png")}
          alt="Tree Image"
          width="100%"
          height="100%"
          style={{marginTop:'-1rem', width: "50px", height: "50px", verticalAlign: "middle" }}
        />{" "}
          GREEN LIFE
        </Link>
      </Typography>
      <Stack
        direction="row"
        spacing={20}
        sx={{           
          marginTop: '-1rem',
          marginBottom: "0.5rem",
          marginLeft: "auto",
          marginRight: "auto"
        }}
        onMouseEnter={handleMenuBarHover}
      >
        <CustomTypography
          onMouseEnter={handleAboutMenuOpen}
          onMouseLeave={handleAboutMenuClose}
          sx={{ fontSize: "1.2rem"}}>
          VISION
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
            style={{marginTop : "0.5rem"}}
          >
            <div>
              <CustomMenuItem onClick={handleClose}>
                <Link href={"/about/greenlife"} underline="none">
                  <CustomTypography
                    sx={{ fontSize: "1rem", backgroundColor: "transparent" }}
                  >
                    필요성
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link href={"/about/greenservice"} underline="none">
                  <CustomTypography sx={{ fontSize: "1rem" }}>
                    서비스
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link href={"/about/greenresult"} underline="none">
                  <CustomTypography sx={{ fontSize: "1rem" }}>
                    기대효과
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
            </div>
          </Menu>
        </CustomTypography>
        <Link href={"/restaurant"} underline="none">
          <CustomTypography sx={{ fontSize: "1.2rem"}}>RESTAURANT</CustomTypography>
        </Link>
        <Link href={"/park"} underline="none">
          <CustomTypography sx={{ fontSize: "1.2rem"}}>PARK</CustomTypography>
        </Link>
      </Stack>
    </AppBar>
  );
};

export default Navbar;
