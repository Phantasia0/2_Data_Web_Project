import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGetFeedQuery } from "../../services/socialApi";
import { useNavigate } from "react-router-dom";

const Comment = ({ data }: any) => {
  // data?._id << 포스트 아이디
  const [text, setText] = useState<any>("");
  const navigate = useNavigate();

  const { data: feedData, isSuccess, isFetching } = useGetFeedQuery(data?._id);

  useEffect(() => {
    if (isSuccess) {
      const parsedData = JSON.parse(feedData?.content);
      const ptext =
        parsedData?.blocks[0]?.text.length > 10
          ? `${parsedData?.blocks[0]?.text.slice(0, 10)}...`
          : parsedData?.blocks[0]?.text;
      setText(ptext);
    }
  }, [isSuccess]);

  return (
    <Link
      underline="none"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`../community/feed/${data?._id}`)}
    >
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={data?.comments?.content}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {feedData?.user?.nickname}
              </Typography>
              {` -  ${text}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Link>
  );
};

export default Comment;
