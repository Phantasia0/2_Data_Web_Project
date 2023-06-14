import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { useInput } from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { changeUserInfo, selectCurrentUser } from "../../features/AuthReducer";
import {
  useChangeUserInfoMutation,
  useChangeUserImageMutation,
} from "../../services/profileApi";
import { validateName } from "../../utils/validate";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../features/ProfileReducer";
import { RootState } from "../../features/configureStore";
import { useGetCurrentUserQuery } from "../../services/authApiWrapper";

const ProfileEditor = ({ setSnackbarOpen, setSnackbarMessage }: any) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // @ts-ignore
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageError, setImageError] = useState<string>("");
  const { isModalVisible } = useSelector(({ profile }: RootState) => ({
    isModalVisible: profile.isModalVisible,
  }));

  // @ts-ignore
  const [nickName, setNickName] = useState<any>(user?.nickname);

  const [
    updateProfile,
    {
      data: profileData,
      isSuccess: profileUpdateSuccess,
      isError: profileUpdateError,
      isLoading: profileUpdateLoading,
    },
  ] = useChangeUserInfoMutation();

  const [
    updateUserImage,
    {
      data: profileImageData,
      isLoading: imageUpdateLoading,
      isError: imageUpdateError,
    },
  ] = useChangeUserImageMutation();

  const handleChangeNickname = (e: any) => {
    setNickName(e.currentTarget.value);
    setError("");
  };

  const handleCancel = async () => {
    // @ts-ignore
    dispatch(setModalVisible(false));
    setSelectedImage(null);
    // @ts-ignore
    setNickName(user?.nickname);
  };

  const handleSubmitNickName = async (e: any) => {
    e.preventDefault();
    // 여기에 API 요청
    try {
      const success = await updateProfile({
        nickname: nickName,
      }).unwrap();
      if (success) {
        setSnackbarOpen(true);
        setSnackbarMessage("닉네임 변경 완료");
        dispatch(changeUserInfo({ key: "nickname", value: nickName }));
      }
    } catch (err) {
      // @ts-ignore
      setError(err.data as string);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setSelectedImage(file);
  };
  const handleImageCancel = () => {
    setSelectedImage(null);
    setImageError("");
  };

  const handleFileSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const success = await updateUserImage(selectedImage).unwrap();

      if (success) {
        setSnackbarOpen(true);
        setSnackbarMessage("프로필 이미지 변경 완료");
        setSelectedImage(null);
      }
    } catch (err) {
      // @ts-ignore
      setImageError(err?.data);
    }
  };

  return (
    <Modal
      open={isModalVisible as boolean}
      onClose={handleCancel}
      aria-labelledby="modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "16px",
          width: "400px",
          outline: "none",
          borderRadius: "1rem",
        }}
      >
        <h2>프로필 변경</h2>
        <form onSubmit={handleSubmitNickName} style={{ marginBottom: "1rem" }}>
          <TextField
            label="nickname"
            name="nickname"
            type="text"
            fullWidth
            value={nickName}
            onChange={handleChangeNickname}
            sx={{ marginBottom: "1rem" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
            <Button
              variant="contained"
              type="submit"
              sx={{ color: "white" }}
              disabled={!validateName(nickName)}
            >
              닉네임 변경
            </Button>
          </Box>
        </form>
        <form
          onSubmit={handleFileSubmit}
          style={{ display: "flex", justifyContent: "space-between" }}
          encType="multipart/form-data"
          name="file"
        >
          <Box>
            <label htmlFor="upload">
              <input
                name="file"
                type="file"
                accept="image/*"
                id="upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                component="span"
                sx={{ color: "white" }}
              >
                프로필 이미지 업로드
              </Button>
              <Box sx={{ marginTop: "1rem" }}>
                {selectedImage && (
                  <>
                    <Typography>바꿀 이미지: {selectedImage?.name}</Typography>
                    <Button
                      variant="contained"
                      onClick={handleImageCancel}
                      sx={{ marginTop: "1rem" }}
                    >
                      이미지 취소
                    </Button>
                  </>
                )}
              </Box>
            </label>
            {imageUpdateLoading && (
              <Typography sx={{ marginLeft: "1rem" }}>
                이미지 로딩중...
              </Typography>
            )}
            {imageError && (
              <Typography sx={{ marginLeft: "1rem" }}>{imageError}</Typography>
            )}
          </Box>
          <Box>
            <Button variant="contained" type="submit" sx={{ color: "white" }}>
              프로필 이미지 변경
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileEditor;
