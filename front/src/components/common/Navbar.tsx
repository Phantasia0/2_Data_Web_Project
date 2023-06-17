import React, { useEffect, useState } from "react";
import { AppBar, Typography, Stack, Menu, MenuItem, Link } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Person4Icon from "@mui/icons-material/Person4";
import User from "../User/User";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentUser,
  setCredentials,
} from "../../features/AuthReducer";
import { useGetCurrentUserQuery } from "../../services/authApiWrapper";

import PrevButton from "./PrevButton";

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

  const isAbout = useMatch("/about");
  const isAboutGreenResultMatched = useMatch("/about/greenresult");
  const isAboutGreenServiceMatched = useMatch("/about/greenservice");
  const isAboutGreenLife = useMatch("/about/greenlife");
  const isRestaurant = useMatch("/restaurant");
  const isPark = useMatch("/park");
  const isActivity = useMatch("/activity");
  const isCommunity = useMatch("/community");
  const isProfile = useMatch("/profile");
  const isEditor = useMatch("/editor");

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

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 99 }}>
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
            cursor: "pointer",
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
          maxWidth: "1200px",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: "1rem",
        }}
        onMouseEnter={handleMenuBarHover}
      >
        <CustomTypography
          onMouseEnter={handleAboutMenuOpen}
          sx={{
            fontSize: "1.2rem",
            color: isAbout && "primary.main",
          }}
        >
          VISION
          <Menu
            anchorEl={anchorEl}
            open={aboutMenuOpen}
            onClose={handleAboutMenuClose}
            onMouseLeave={handleAboutMenuClose}
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
            <div onMouseLeave={handleAboutMenuClose}>
              <CustomMenuItem onClick={handleClose}>
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    navigate("/about/greenlife");
                  }}
                  underline="none"
                >
                  <CustomTypography
                    sx={{
                      fontSize: "1rem",
                      color: isAboutGreenLife && "primary.main",
                    }}
                  >
                    필요성
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    navigate("/about/greenservice");
                  }}
                  underline="none"
                >
                  <CustomTypography
                    sx={{
                      fontSize: "1rem",
                      color: isAboutGreenServiceMatched && "primary.main",
                    }}
                  >
                    서비스
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
              <CustomMenuItem onClick={handleClose}>
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    navigate("/about/greenresult");
                  }}
                  underline="none"
                >
                  <CustomTypography
                    sx={{
                      fontSize: "1rem",
                      color: isAboutGreenResultMatched && "primary.main",
                    }}
                  >
                    기대효과
                  </CustomTypography>
                </Link>
              </CustomMenuItem>
            </div>
          </Menu>
        </CustomTypography>
        <Link
          onClick={() => {
            window.scrollTo({ top: 0 });
            navigate("/restaurant");
          }}
          underline="none"
        >
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color: isRestaurant && "primary.main",
            }}
          >
            RESTAURANT
          </CustomTypography>
        </Link>
        <Link
          onClick={() => {
            window.scrollTo({ top: 0 });
            navigate("/park");
          }}
          underline="none"
        >
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color: isPark && "primary.main",
            }}
          >
            PARK
          </CustomTypography>
        </Link>
        <Link
          onClick={() => {
            window.scrollTo({ top: 0 });
            navigate("/activity");
          }}
          underline="none"
        >
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color: isActivity && "primary.main",
            }}
          >
            ACTIVITY
          </CustomTypography>
        </Link>
        <Link
          onClick={() => {
            window.scrollTo({ top: 0 });
            navigate("/community");
          }}
          underline="none"
        >
          <CustomTypography
            sx={{
              fontSize: "1.2rem",
              color: (isCommunity || isEditor) && "primary.main",
            }}
          >
            SHARE
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
            sx={{
              fontSize: "1.2rem",
              color: isProfile && "primary.main",
            }}
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
                  <Link
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      navigate("/profile");
                    }}
                    underline="none"
                  >
                    <CustomTypography
                      sx={{
                        fontSize: "1rem",
                        backgroundColor: "transparent",
                        color: isProfile && "primary.main",
                      }}
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
        {currentUrl !== "/" && <PrevButton />}
      </Stack>
      {userAuthOpen && <User setUserAuthOpen={setUserAuthOpen} />}
    </AppBar>
  );
};

export default Navbar;
