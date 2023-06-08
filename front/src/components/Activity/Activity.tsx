import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  CheckboxClasses,
} from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import LabelButton from "./LabelButton";
import ActivitySlick from "./ActivitySlick";
import { useGetActivitysDataQuery } from "../../services/activityApi";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import {
  filterBySelected,
  removeSelected,
  updateAllData,
  updateData,
} from "../../features/ActivityReducer";
import { Simulate } from "react-dom/test-utils";
import Slider from "react-slick";

const categoryList = ["교통", "전기", "냉/난방", "자원"];

const Activity = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<Boolean>(false);

  const { category, filtered, categories } = useSelector(
    ({ activity }: RootState) => ({
      category: activity.category,
      filtered: activity.filtered,
      categories: activity.categories,
    }),
    shallowEqual
  );

  const { data, error, isSuccess, isLoading } = useGetActivitysDataQuery(
    category as string
  );

  useEffect(() => {
    if (data && isSuccess && !isChecked && !filtered) {
      dispatch(
        updateAllData({
          categories: [...categoryList],
          data: data?.activity,
        })
      );
    }
  }, [data, isSuccess, isChecked]);

  useEffect(() => {
    if (data && isSuccess && isChecked && filtered) {
      dispatch(
        updateData({
          category: category,
          data: data?.activity,
        })
      );
    }
  }, [category, data, isSuccess, categories]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontSize: {
              xs: "clamp(15px, 2vw, 30px)",
              sm: "clamp(25px, 2vw, 50px)",
            },
            lineHeight: { xs: "1.2", sm: "1.5" },
            color: "primary.main",
            whiteSpace: "nowrap",
          }}
        >
          활동 소개
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: 2,
          }}
        >
          {categoryList.map((item) => (
            <LabelButton key={item} label={item} able={isChecked} />
          ))}
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch defaultChecked={false} onChange={handleFilterChange} />
            }
            label="필터링"
          />
        </Box>
      </Box>
      {isSuccess && categories && (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={10}>
            {categories.map((cate) => (
              <div key={cate}>
                <ActivitySlick category={cate} />
              </div>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Activity;
