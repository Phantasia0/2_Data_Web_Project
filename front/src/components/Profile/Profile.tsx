// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./RightBar";
import { Box, createTheme, Grid, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="Feed-container">
      <Box bgcolor="background.default" color="text.primary">
        <Navbar />
        <Grid container>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Feed />
          </Grid>
          {windowWidth > 768 && (
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Rightbar />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Profile;

// <div className="Feed-container">
//     <Box bgcolor={"background.default"} color={"text.primary"}>
//       <Navbar />
//       <Box display="flex" flexDirection={windowWidth < 600 ? "column" : "row"}>
//         {windowWidth < 600 ? (
//           <>
//             <Sidebar />
//             <Feed />
//           </>
//         ) : (
//           <>
//             <Sidebar />
//             <Box flexGrow={1}>
//               <Feed />
//             </Box>
//             <Rightbar />
//           </>
//         )}
//       </Box>
//     </Box>
//   </div>
