import React, { useRef, useState,useEffect } from "react";
import MUIRichTextEditor from "mui-rte";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useAddFeedMutation } from "../../services/feedApi";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { resetCurrentPage, addThisFeed } from "../../features/SocialReducer";
import Basket from "../Basket/Basket";
import BasketPark from "../Basket/BasketPark";
import Rightbar2 from "./Rightbar2";
import * as Baskets from "../../features/BasketReducer";
import * as BasketParks from "../../features/BasketParkReducer";

const MyHashTagDecorator = (props: any) => {
  return (
    <span
      style={{
        color: "#3F51B5",
      }}
    >
      {props.children}
    </span>
  );
};

const MyAtDecorator = (props: any) => {
  const customUrl = "http://myulr/mention/" + props.decoratedText;
  return (
    <a
      onClick={() => (window.location.href = customUrl)}
      style={{
        color: "green",
        cursor: "pointer",
      }}
    >
      {props.children}
    </a>
  );
};

const FeedEditor = () => {
  const rteRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    addFeed,
    { data: addFeedData, isSuccess: addFeedSuccess, isError: addFeedError },
  ] = useAddFeedMutation();

  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const [Type, setType] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const save = async (story: string) => {
    const parsedData = JSON.parse(story);
    const text =
      parsedData?.blocks[0]?.text.length > 20
        ? `${parsedData?.blocks[0]?.text.slice(0, 20)}...`
        : parsedData?.blocks[0]?.text;
    // const content = text.replace(/\s/g, "");
    // if (!content) {
    //   setSnackbarOpen(true);
    //   return;
    // }

    if (story !== "") {
      dispatch(resetCurrentPage(0));

      const success = await addFeed({
        content: story,
      }).unwrap();

      if (success) {
        // console.log(success);
        dispatch(addThisFeed(success));
        navigate("/community");
      }
    }
  };


  const handleClickPost = (e: any) => {
    // @ts-ignore
    rteRef?.current?.save();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClickRestaurantList = () => {
    setShow(true);
    setType("restaurant");
  };

  const handleClickParkList = () => {
    setShow(true);
    setType("park");
  };

  const handleClickCancelRightBar = () => {
    setShow(false);
    dispatch(BasketParks.resetSelectedItemId());
    dispatch(Baskets.resetSelectedItemId());
  };



  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <Box position="fixed" marginTop={4}>
        <Box sx={{ marginLeft: "1rem", marginTop: "5rem", flex: "0.5" }}>
          <Box onClick={handleClickRestaurantList}>
            <Basket />
          </Box>
          <Box onClick={handleClickParkList}>
            <BasketPark />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          flex: "3",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
            marginBottom: "1rem",
            height: "600px",
            maxHeight: "600px",
            width: "100%",
          }}
        >
          <MuiThemeProvider theme={theme}>
            <MUIRichTextEditor
              ref={rteRef}
              label="당신의 스토리를 써주세요"
              onSave={save}
              decorators={[
                {
                  component: MyHashTagDecorator,
                  regex: /\#[\w]+/g,
                },
                {
                  component: MyAtDecorator,
                  regex: /\@[\w]+/g,
                },
              ]}
            />
          </MuiThemeProvider>
          <Box>
            <Box sx={{ marginLeft: "2rem" }}>
              {show && <Rightbar2 Type={Type} />}
            </Box>
            <Box sx={{ marginTop: "2rem", position:"absolute", top:"0" }}>
              {show && (
                <Button onClick={handleClickCancelRightBar} variant="contained">
                  닫기
                </Button>
              )}
            </Box>
          </Box>
          
        </Box>
        <Box sx={{ marginTop: "1rem" }}>
          <Button
            onClick={handleClickPost}
            variant="contained"
            sx={{ height: "auto", color: "white" }}
          >
            POST
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="내용을 입력해주세요."
          ContentProps={{
            sx: { backgroundColor: "orange" },
          }}
        />
      </Box>
    </Box>
  );
};

export default FeedEditor;
