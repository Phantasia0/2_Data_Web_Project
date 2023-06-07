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

interface RestaurantVeganItemProps {
  data: any;
}

const RestaurantVeganItem: FC<RestaurantVeganItemProps> = ({ data }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link href={`/restaurant/detail/${data._id}`}>
            <Avatar alt="식당" src={data?.image} />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={data?.name}
          secondary={
            <React.Fragment>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  tel
                </Typography>
                {data?.tel ? data.tel : "전화번호가 등록되지 않았습니다."}
              </div>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  category
                </Typography>
                {data?.category
                  ? data?.category
                  : "카테고리가 등록되지 않았습니다."}
              </div>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  address
                </Typography>
                {data?.address ? data?.address : "주소가 등록되지 않았습니다."}
              </div>
              <div>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  region
                </Typography>
                {data?.region ? data?.region : "리전이 등록되지 않았습니다."}
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default RestaurantVeganItem;
