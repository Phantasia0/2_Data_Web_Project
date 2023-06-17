import React, { FC, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme, Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { Activity } from "../../models/activity.model";

interface ActivitySlick {
  category: string;
  autoplay: boolean;
}

const ActivitySlick: FC<ActivitySlick> = ({ category, autoplay }) => {
  const theme = useTheme();
  const { dataObject } = useSelector(
    ({ activity }: RootState) => ({
      dataObject: activity.dataObject,
    }),
    shallowEqual
  );

  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: autoplay,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
    ],
  });

  useEffect(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      autoplay: autoplay,
    }));
  }, [autoplay]);

  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        fontFamily: "NanumSquareExtraBold, sans-serif",
        color: "info.main",
      }}
    >
      <h2>{category}</h2>
      <Slider {...settings}>
        {dataObject &&
          dataObject[category]?.map((item: Activity) => (
            <div key={item._id}>
              <ActivityCard data={item} />
            </div>
          ))}
      </Slider>
    </Box>
  );
};

export default ActivitySlick;
