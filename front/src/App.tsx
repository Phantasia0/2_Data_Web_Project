import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import { theme } from "./theme/theme";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/common/Home";
import AboutGreenLife from "./components/About/AboutGreenLife";
import AboutGreenService from "./components/About/AboutGreenService";
import AboutGreenResult from "./components/About/AboutGreenResult";
import Restaurant from "./components/Restaurant/Restaurant";
import Park from "./components/Park/Park";
import RestaurantVeganDetail from "./components/Restaurant/RestaurantVeganDetail";
import RestaurantKeywordDetail from "./components/Restaurant/RestaurantKeywordDetail";
import ParkDetail from "./components/Park/ParkDetail";
import Activity from "./components/Activity/Activity";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="contents-container">
        <Outlet />
      </div>
      {/*<Footer />*/}
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
        path: "restaurant/detail/:restaurantId",
        element: <RestaurantVeganDetail />,
      },
      {
        path: "restaurant/keyword/:restaurantId",
        element: <RestaurantKeywordDetail />,
      },
      {
        path: "park",
        element: <Park />,
      },
      {
        path: "park/detail/:parkId",
        element: <ParkDetail />,
      },
      {
        path: "activity",
        element: <Activity />,
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
