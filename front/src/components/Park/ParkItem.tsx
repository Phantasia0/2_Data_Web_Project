import React, { FC } from "react";

import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface ParkItemProps {
  data: any;
}

const ParkItem: FC<ParkItemProps> = ({ data }) => {
  const { basketItem }: { basketItem: any } = useSelector(
    ({ basketPark }: RootState) => ({
      // @ts-ignore
      basketItem: basketPark.item,
    })
  );

  const boxStyle = {
    backgroundColor: data?._id === basketItem?._id ? "#F3F3F3" : "transparent",
    border: `2px solid ${
      data?._id === basketItem?._id ? "#397261" : "transparent"
    }`,
    borderRadius: "1rem",
  };
  return (
    <Box sx={boxStyle}>
      <ListItem alignItems="flex-start">
        <Link
          href={`/park/detail/${data._id}`}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            secondary={
              <React.Fragment>
                <Typography component="div" variant="body2">
                  <span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginRight: "0.5rem",
                      }}
                    >
                      {data?.name}
                    </span>
                    <IconButton sx={{ fontSize: "15px", fontWeight: "blod" }}>
                      <Checkbox
                        icon={<FavoriteBorder sx={{ fontSize: "1rem" }} />}
                        checkedIcon={
                          <Favorite sx={{ color: "red", fontSize: "1rem" }} />
                        }
                        checked={data?.contactCheck}
                        disabled={false}
                      />
                      {data?.contactCount + "찜"}
                    </IconButton>
                  </span>
                </Typography>
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
        </Link>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Box>
  );
};

export default ParkItem;
