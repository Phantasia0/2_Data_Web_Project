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
import { validateRegisterForm } from "../../utils/validate";
import { useRegisterMutation } from "../../services/authApiWrapper";

interface RegisterModalProps {
  setOpen: (value: any) => void;
  setSnackbarOpen: (value: any) => void;
  setFormState: (value: string) => void;
}

const RegisterModal: FC<RegisterModalProps> = ({
  setOpen,
  setSnackbarOpen,
  setFormState,
}: any) => {
  const { width } = useWindowDimensions();
  const [id, onChangeId] = useInput("");
  const [nickname, onChangNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword] = useInput("");

  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await registerUser({ id, nickname, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setSnackbarOpen(true);
    }
  }, [isSuccess]);

  const handleMove = (e: any) => {
    setFormState("login");
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
        회원가입
      </DialogTitle>
      <TextField
        id="username"
        label="ID"
        variant="outlined"
        fullWidth
        onChange={onChangeId}
      />
      <TextField
        id="username"
        label="Nickname"
        variant="outlined"
        fullWidth
        onChange={onChangNickname}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        onChange={onChangePassword}
      />
      <TextField
        id="password"
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        onChange={onChangeConfirmPassword}
      />
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "50%" }}
          disabled={
            !validateRegisterForm(id, nickname, password, confirmPassword)
          }
        >
          <Typography color="white">Register</Typography>
        </Button>
      </DialogActions>
      {isError && (
        <Typography color="red">
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
          <Typography>Sign In</Typography>
        </Button>
      </Box>
    </form>
  );
};

export default RegisterModal;
