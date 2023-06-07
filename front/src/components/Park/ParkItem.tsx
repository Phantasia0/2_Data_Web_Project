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

interface ParkItemProps {
  data: any;
}

const ParkItem: FC<ParkItemProps> = ({ data }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <Link
          href={`/park/detail/${data._id}`}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
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
                    address
                  </Typography>
                  {data?.address
                    ? data?.address
                    : "주소가 등록되지 않았습니다."}
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
        </Link>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ParkItem;
