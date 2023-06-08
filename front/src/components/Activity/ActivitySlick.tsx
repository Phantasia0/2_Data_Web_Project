import React, { FC, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme, Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";

interface ActivitySlick {
  category: string;
}

const ActivitySlick: FC<ActivitySlick> = ({ category }) => {
  const theme = useTheme();
  const { datas } = useSelector(
    ({ activity }: RootState) => ({
      datas: activity.datas,
    }),
    shallowEqual
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: true,
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
  };

  return (
    <Box sx={{ margin: "auto", width: "100%" }}>
      <h2>{category}</h2>
      <Slider {...settings}>
        {datas &&
          datas[category]?.map((item) => (
            <div key={item._id}>
              <ActivityCard data={item} />
            </div>
          ))}
      </Slider>
    </Box>
  );
};

export default ActivitySlick;
