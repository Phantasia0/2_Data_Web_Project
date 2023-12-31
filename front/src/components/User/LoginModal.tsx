import React, { FC, useEffect } from "react";
import {
  TextField,
  Button,
  DialogTitle,
  DialogActions,
  Box,
  styled,
  Typography,
} from "@mui/material";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useInput } from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../services/authApiWrapper";
import { setCredentials } from "../../features/AuthReducer";

interface LoginModalProps {
  setOpen: (value: any) => void;
  setSnackbarOpen: (value: any) => void;
  setFormState: (value: string) => void;
}

const LoginModal: FC<LoginModalProps> = ({
  setOpen,
  setSnackbarOpen,
  setFormState,
}: any) => {
  const { width } = useWindowDimensions();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  const [loginUser, { data, isSuccess, isError, error }] = useLoginMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = await loginUser({ id, password });
    if ("data" in user) window.location.reload();
  };

  useEffect(() => {
    if (isSuccess) {
      setSnackbarOpen(true);
      setOpen(false);
      dispatch(
        setCredentials({
          user: data,
          token: data.token,
        })
      );
    }
  }, [isSuccess]);

  const handleMove = (e: any) => {
    setFormState("register");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "1rem",
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
        }}
      >
        로그인
      </DialogTitle>
      <TextField
        id="username"
        label="ID"
        variant="outlined"
        fullWidth
        onChange={onChangeId}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        onChange={onChangePassword}
      />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "50%" }}
        >
          <Typography color="white">Login</Typography>
        </Button>
      </DialogActions>
      {isError && (
        <Typography color="red" style={{ whiteSpace: "pre-line" }}>
          <center>
            {/*@ts-ignore*/}
            {error?.data.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </center>
        </Typography>
      )}
      <Box textAlign="center">
        <Button
          color="primary"
          sx={{ textDecoration: "none" }}
          onClick={handleMove}
        >
          <Typography>Register</Typography>
        </Button>
      </Box>
    </form>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
