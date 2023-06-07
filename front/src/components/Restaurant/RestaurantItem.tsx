import React, { FC } from "react";

import {
  Avatar,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGetDetailDataQuery } from "../../services/restaurantsApi";

interface RestaurantItemProps {
  data: any;
}

const RestaurantItem: FC<RestaurantItemProps> = ({ data }) => {
  const {
    data: finded,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetDetailDataQuery(data.id);

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link href={`/restaurant/keyword/${data.id}`} rel="noopener">
            <Avatar alt="식당" src={finded?.basicInfo?.mainphotourl} />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={data?.place_name}
          secondary={
            <React.Fragment>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  tel{" "}
                </Typography>
                {data?.phone ? data.phone : "1234-1232"}
              </div>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  category{" "}
                </Typography>
                {data?.category_name?.split(">")[1]
                  ? data?.category_name?.split(">")[1]
                  : "카테고리가 등록되지 않았습니다."}
              </div>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  address{" "}
                </Typography>
                {data?.address_name
                  ? data?.address_name
                  : "주소가 등록되지 않았습니다."}
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default RestaurantItem;
