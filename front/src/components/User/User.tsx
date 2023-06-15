import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { Dialog, DialogContent, Snackbar, Box, styled } from "@mui/material";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const ImageBox = styled(Box)(({ theme }) => ({
  width: "70%",
  height: "auto",
  ml: theme.spacing(2),
  mb: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
}));

interface UserProps {
  setUserAuthOpen: Dispatch<SetStateAction<Boolean>>;
}

const User: FC<UserProps> = ({ setUserAuthOpen }) => {
  const [open, setOpen] = useState<any>(true);
  const [formState, setFormState] = useState<string>("login");
  const [prevState, setPrevState] = useState<string>("login");
  const [snackbarOpen, setSnackbarOpen] = useState<any>(false);
  const { width } = useWindowDimensions();

  const handleClose = () => {
    setOpen(false);
    setUserAuthOpen(false);
  };

  useEffect(() => {
    if (formState === "register" && snackbarOpen) {
      setFormState("login");
      setPrevState("register");
    }

    if (prevState === "register") {
      setTimeout(() => {
        setPrevState("login");
      }, 2000);
    }
  }, [snackbarOpen]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    if (prevState !== "register") {
      setUserAuthOpen(false);
    }
  };

  const whatToDisplay = () => {
    if (formState === "login") {
      return (
        <LoginModal
          setOpen={setOpen}
          setSnackbarOpen={setSnackbarOpen}
          setFormState={setFormState}
        />
      );
    } else if (formState === "register") {
      return (
        <RegisterModal
          setOpen={setOpen}
          setSnackbarOpen={setSnackbarOpen}
          setFormState={setFormState}
        />
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "50vw",
            maxWidth: "100%",
            borderRadius: "1rem",
          },
        }}
      >
        <DialogContent>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ maxHeight: "100%" }}
          >
            {width > 1080 && (
              <ImageBox sx={{ borderRadius: "1rem" }}>
                <img
                  src={require("../../assets/images/social.jpg")}
                  alt="social"
                  style={{
                    width: "90%",
                    height: "auto",
                    borderRadius: "1rem",
                  }}
                />
              </ImageBox>
            )}
            {whatToDisplay()}
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={prevState === "login" ? "로그인 성공!" : "회원가입 성공!"}
        ContentProps={{
          sx: { backgroundColor: "primary.main" },
        }}
      />
    </>
  );
};

export default User;
