import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import { theme } from "./theme/theme";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutGreenLife from "./components/AboutGreenLife";
import AboutGreenService from "./components/AboutGreenService";
import AboutGreenResult from "./components/AboutGreenResult";
import Restaurant from "./components/Restaurant";
import Park from "./components/Park";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="contents-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        children: [
          {
            path: "greenlife",
            element: <AboutGreenLife />,
          },
          {
            path: "greenservice",
            element: <AboutGreenService />,
          },
          {
            path: "greenresult",
            element: <AboutGreenResult />,
          },
        ],
      },
      {
        path: "restaurant",
        element: <Restaurant />,
      },
      {
        path: "park",
        element: <Park />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app-container">
      <ThemeProvider theme={theme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
