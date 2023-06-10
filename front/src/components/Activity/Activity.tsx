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
import { fontdesign } from "../../theme/fontdesign";

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
          marginTop: "2vw",
        }}
      >
        <Typography
          sx={fontdesign.xsTitle}
        >
          활동 소개
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: '2vw',
          }}
        >
          {categoryList.map((item) => (
            <LabelButton key={item} label={item} able={isChecked} />
          ))}
        </Box>
        <Box sx={{marginTop: '0vw', marginLeft:'2vw'}}>
          <FormControlLabel
            control={
              <Switch sx={fontdesign.xsText} defaultChecked={false} onChange={handleFilterChange} />
            }
            label={
              <Typography variant="body1" sx={fontdesign.xsText} style={{ fontWeight: 'bold', color: "info.main"}}>
                필터링
              </Typography>
            }
          />
        </Box>
      </Box>
      {isSuccess && categories && (
        <Grid container justifyContent="center" sx={fontdesign.xsText}>
          <Grid item xs={12} sm={10} md={10} lg={10}>
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
