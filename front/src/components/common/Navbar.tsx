import React, { useEffect, useState } from "react";
import { AppBar, Typography, Stack, Menu, MenuItem, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Person4Icon from "@mui/icons-material/Person4";
import User from "../User/User";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
  "@media (max-width: 768px)": {
    fontSize: "0.5rem",
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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [anchorProfileEl, setAnchorProfileEl] = useState<null | HTMLElement>(
    null
  );
  const [userAuthOpen, setUserAuthOpen] = useState<Boolean>(false);
  const user = useSelector(selectCurrentUser, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isSuccess, isError } = useGetCurrentUserQuery(undefined, {
    // @ts-ignore
    skip: Boolean(user) || !sessionStorage.getItem("user"),
    // @ts-ignore
    refetchOnArgChange: true,
  });

  useEffect(() => {
    // @ts-ignore
    if (isSuccess && !user) {
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

  const currentUrl = window.location.pathname;
  const currentPath = currentUrl.split("/");

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
    window.location.reload();
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
          "@media (max-width: 768px)": {
            flexDirection: "column",
            alignItems: "center",
            fontSize: 30,
          },
        }}
      >
        <Link
          onClick={() => navigate("/")}
          underline="none"
          sx={{
            fontFamily: "Black Han Sans, sans-serif",
            display: "flex",
            alignItems: "center",
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
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: "10px",
        }}
        onMouseEnter={handleMenuBarHover}
      >
        <CustomTypography
          onMouseEnter={handleAboutMenuOpen}
          onMouseLeave={handleAboutMenuClose}
          sx={{
            fontSize: "1.2rem",
            color: currentPath[1] === "about" ? "primary.main" : undefined,
          }}
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
                <Link
                  onClick={() => navigate("/about/greenlife")}
                  underline="none"
                >
                  <CustomTypography
                    sx={{
                      fontSize: "1rem",
                      color:
                        currentPath[1] === "about" &&
                        currentPath[2] === "greenlife"
                          ? "primary.main"
                          : undefined,
                    }}
                  >
                    필요성
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link
                  onClick={() => navigate("/about/greenservice")}
                  underline="none"
                >
                  <CustomTypography
                    sx={{
                      fontSize: "1rem",
                      color:
                        currentPath[1] === "about" &&
                        currentPath[2] === "greenservice"
                          ? "primary.main"
                          : undefined,
                    }}
                  >
                    서비스
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link
                  onClick={() => navigate("/about/greenresult")}
                  underline="none"
                >
                  <CustomTypography
                    sx={{
                      fontSize: "1rem",
                      color:
                        currentPath[1] === "about" &&
                        currentPath[2] === "greenresult"
                          ? "primary.main"
                          : undefined,
                    }}
                  >
                    기대효과
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
            </div>
          </Menu>
        </CustomTypography>
        <Link onClick={() => navigate("/restaurant")} underline="none">
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color:
                currentPath[1] === "restaurant" ? "primary.main" : undefined,
            }}
          >
            RESTAURANT
          </CustomTypography>
        </Link>
        <Link onClick={() => navigate("/park")} underline="none">
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color: currentPath[1] === "park" ? "primary.main" : undefined,
            }}
          >
            PARK
          </CustomTypography>
        </Link>
        <Link onClick={() => navigate("/activity")} underline="none">
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color: currentPath[1] === "activity" ? "primary.main" : undefined,
            }}
          >
            ACTIVITY
          </CustomTypography>
        </Link>
        <Link onClick={() => navigate("/community")} underline="none">
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color:
                currentPath[1] === "community" ? "primary.main" : undefined,
            }}
          >
            STORY
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
                  <Link onClick={() => navigate("/profile")} underline="none">
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
                    onClick={handleLogOut}
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
