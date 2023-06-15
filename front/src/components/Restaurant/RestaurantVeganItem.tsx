import React, { FC } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";

interface RestaurantVeganItemProps {
  data: any;
}

const RestaurantVeganItem: FC<RestaurantVeganItemProps> = ({ data }) => {
  const { isClicked, basketItem }: { isClicked: boolean; basketItem: any } =
    useSelector(({ basket }: RootState) => ({
      // @ts-ignore
      isClicked: basket.isClicked,
      // @ts-ignore
      basketItem: basket.item,
    }));

  const boxStyle = {
    backgroundColor: data?._id === basketItem?._id ? "#F3F3F3" : "transparent",
    border: `2px solid ${
      data?._id === basketItem?._id ? "#397261" : "transparent"
    }`,
    borderRadius: "1rem",
  };

  return (
    <Box sx={boxStyle}>
      <Link
        href={`/restaurant/detail/${data._id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="식당" src={data?.image} />
          </ListItemAvatar>
          <ListItemText
            primary={data?.name}
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            secondary={
              <React.Fragment>
                <div>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <img
                      src={require("../../assets/images/phone.png")}
                      alt="Phone Icon"
                      style={{
                        width: "13px",
                        height: "13px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
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
                    <img
                      src={require("../../assets/images/category.png")}
                      alt="category Icon"
                      style={{
                        width: "13px",
                        height: "13px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
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
                    <img
                      src={require("../../assets/images/address.png")}
                      alt="Address Icon"
                      style={{
                        width: "13px",
                        height: "13px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
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
                    <img
                      src={require("../../assets/images/region.png")}
                      alt="Region Icon"
                      style={{
                        width: "13px",
                        height: "13px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                  </Typography>
                  {data?.region ? data?.region : "리전이 등록되지 않았습니다."}
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      </Link>
      <Divider variant="inset" component="li" />
    </Box>
  );
};

export default RestaurantVeganItem;
