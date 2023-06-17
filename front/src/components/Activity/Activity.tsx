import React, { useEffect, useState, useRef } from "react";
import { Typography, Box, Grid, Switch, FormControlLabel } from "@mui/material";
import LabelButton from "./LabelButton";
import ActivitySlick from "./ActivitySlick";
import { useGetActivitiesDataQuery } from "../../services/activityApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import { updateAllData, updateData } from "../../features/ActivityReducer";
import { fontdesign } from "../../theme/fontdesign";
import LoadingImage from "../common/Loading";
import {
  ActivityData,
  Activity as ActivityModel,
} from "../../models/activity.model";

const Activity = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<Boolean>(false);

  const { category, filtered, categories } = useSelector(
    ({ activity }: RootState) => ({
      category: activity.category,
      filtered: activity.filtered,
      categories: activity.categories,
    })
  );

  const { data, isSuccess, isLoading } = useGetActivitiesDataQuery(
    category as string
  );

  const [autoplay, setAutoplay] = useState(true);

  const selectCurrentActivity = () => {
    if (data && isSuccess && !isChecked && !filtered) {
      return true;
    }
    return false;
  };

  const whichToUpdateActivity = () => {
    if (data && isSuccess && isChecked && filtered) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const validation = selectCurrentActivity();

    if (validation) {
      dispatch(
        updateAllData({
          data: data?.activity,
          dataObject: {},
          categories: [],
          category: "",
          filtered: false,
        })
      );
    }
  }, [data, isSuccess, isChecked]);

  useEffect(() => {
    const validation = whichToUpdateActivity();

    if (validation) {
      dispatch(
        updateData({
          category: category,
          data: data?.activity,
          dataObject: {},
          categories: [],
          filtered: false,
        })
      );
    }
  }, [category, data, isSuccess, categories]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleAutoplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAutoplay(isChecked);
  };

  if (isLoading) {
    return <LoadingImage />;
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
        <Typography sx={fontdesign.xsTitle}>활동 소개</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "2vw",
          }}
        >
          {categories?.map((item) => (
            <LabelButton key={item} label={item} able={isChecked} />
          ))}
        </Box>
        <Box sx={{ marginTop: "0vw", marginLeft: "2vw" }}>
          <FormControlLabel
            control={
              <Switch
                sx={fontdesign.xsText}
                defaultChecked={false}
                onChange={handleFilterChange}
              />
            }
            label={
              <Typography
                variant="body1"
                sx={fontdesign.xsText}
                style={{ fontWeight: "bold", color: "info.main" }}
              >
                필터링
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Switch
                sx={fontdesign.xsText}
                defaultChecked={true}
                onChange={handleAutoplayChange}
              />
            }
            label={
              <Typography
                variant="body1"
                sx={fontdesign.xsText}
                style={{ fontWeight: "bold", color: "info.main" }}
              >
                Autoplay
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
                <ActivitySlick
                  key={autoplay.toString()}
                  category={cate}
                  autoplay={autoplay}
                />
              </div>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Activity;
