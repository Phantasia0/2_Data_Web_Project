import React, { useEffect, useState } from "react";
import { AppBar, Typography, Stack, Menu, MenuItem, Link } from "@mui/material";
import { styled } from "@mui/system";
import Person4Icon from "@mui/icons-material/Person4";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentUser,
  setCredentials,
} from "../../features/AuthReducer";
import AppleIcon from "@mui/icons-material/Apple";
import {
  useGetCurrentUserQuery,
  authApiWrapper,
} from "../../services/authApiWrapper";

export const CustomTypography = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.info.main,
  transition: "color 0.15s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  fontFamily: "Black Han Sans, sans-serif",
  fontWeight: "light",
}));

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const Navbar = () => {
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [anchorProfileEl, setAnchorProfileEl] = useState<null | HTMLElement>(
    null
  );
  const [userAuthOpen, setUserAuthOpen] = useState<Boolean>(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { data, isSuccess, isError } = useGetCurrentUserQuery(undefined, {
    // @ts-ignore
    skip: Boolean(user) || !sessionStorage.getItem("user"),
    // @ts-ignore
    refetchOnArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setCredentials({
          user: data,
          token: data.token,
        })
      );
    }
  }, [isSuccess]);

  const handleAboutMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAboutMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setProfileMenuOpen(true);
    setAnchorProfileEl(event.currentTarget);
  };

  const handleAboutMenuClose = () => {
    setAboutMenuOpen(false);
    setAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuOpen(false);
    setAnchorProfileEl(null);
  };

  const handleMenuBarHover = () => {
    if (!aboutMenuOpen) {
      setAnchorEl(null);
    }
    if (!profileMenuOpen) {
      setAnchorProfileEl(null);
    }
  };

  const handleClose = () => {
    setAboutMenuOpen(false);
    setAnchorEl(null);
  };

  const handleProfileClose = () => {
    setProfileMenuOpen(false);
    setAnchorProfileEl(null);
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
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Link
          href={"/"}
          underline="none"
          sx={{
            fontFamily: "Black Han Sans, sans-serif",
          }}
        >
          <img
            src={require("../../assets/images/tree.png")}
            alt="Tree Image"
            width="100%"
            height="100%"
            style={{
              marginTop: "-1rem",
              width: "50px",
              height: "50px",
              verticalAlign: "middle",
            }}
          />{" "}
          GREEN LIFE
        </Link>
      </Typography>
      <Stack
        direction="row"
        spacing={20}
        sx={{
          marginTop: "-1rem",
          marginBottom: "0.5rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onMouseEnter={handleMenuBarHover}
      >
        <CustomTypography
          onMouseEnter={handleAboutMenuOpen}
          onMouseLeave={handleAboutMenuClose}
          sx={{ fontSize: "1.2rem" }}
        >
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
            style={{ marginTop: "0.5rem" }}
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
          <CustomTypography sx={{ fontSize: "1.2rem" }}>
            RESTAURANT
          </CustomTypography>
        </Link>
        <Link href={"/park"} underline="none">
          <CustomTypography sx={{ fontSize: "1.2rem" }}>PARK</CustomTypography>
        </Link>
        <Link href={"/activity"} underline="none">
          <CustomTypography sx={{ fontSize: "1.2rem" }}>
            Activity
          </CustomTypography>
        </Link>
        {!user ? (
          <CustomTypography onClick={() => setUserAuthOpen(true)}>
            <Person4Icon />
          </CustomTypography>
        ) : (
          <CustomTypography
            onMouseEnter={handleProfileMenuOpen}
            onMouseLeave={handleProfileMenuClose}
            sx={{ fontSize: "1rem" }}
          >
            {/* @ts-ignore*/}
            {user?.nickname}
            <Menu
              anchorEl={anchorProfileEl}
              open={profileMenuOpen}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ marginTop: "0.5rem" }}
            >
              <div>
                <CustomMenuItem onClick={handleProfileClose}>
                  <Link href={"/about/greenlife"} underline="none">
                    <CustomTypography
                      sx={{ fontSize: "1rem", backgroundColor: "transparent" }}
                    >
                      My Page
                    </CustomTypography>
                  </Link>
                </CustomMenuItem>
                <CustomMenuItem onClick={handleProfileClose}>
                  <CustomTypography
                    sx={{ fontSize: "1rem" }}
                    onClick={() => dispatch(logOut())}
                  >
                    LogOut
                  </CustomTypography>
                </CustomMenuItem>
              </div>
            </Menu>
          </CustomTypography>
        )}
      </Stack>
      {userAuthOpen && <User setUserAuthOpen={setUserAuthOpen} />}
    </AppBar>
  );
};

export default Navbar;
