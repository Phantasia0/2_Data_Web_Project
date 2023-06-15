import { Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { changeUserInfo, selectCurrentUser } from "../../features/AuthReducer";
import { searchKeyword } from "../../features/ProfileReducer";
import { RootState } from "../../features/configureStore";
import { useGetCurrentUserQuery } from "../../services/authApiWrapper";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#397261",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "1rem",
  width: "40%",
  maxWidth: "500px",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector(({ profile }: RootState) => ({
    isModalVisible: profile.isModalVisible,
  }));

  // @ts-ignore
  const { data, refetch: getCurrentRefetch } = useGetCurrentUserQuery();
  console.log(data);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debounceOnChangeKeyword(event.target.value);
  };

  const debounceKeywordSearch = (keyword: string) => {
    dispatch(
      searchKeyword({
        keyword: keyword,
      })
    );
  };

  const DEBOUNCE_DELAY: number = 300;

  const debounceOnChangeKeyword = useCallback(
    debounce(debounceKeywordSearch, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    if (!isModalVisible) {
      getCurrentRefetch();
    }
  }, [isModalVisible]);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Search>
          <InputBase
            placeholder="유저 스토리 검색"
            onChange={handleSearchChange}
            value={searchValue}
            sx={{ width: "100%" }}
          />
        </Search>
        <Icons>
          {/* <Badge badgeContent={1} color="error">
            <Notifications />
          </Badge> */}
          <Avatar
            sx={{ width: 50, height: 50 }}
            // @ts-ignore
            src={`http://localhost:5001/profile/${data?.profile}`}
          />
          <Typography variant="body1" sx={{ color: "white" }}>
            {data?.nickname}
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            {data?.follow * 10 + data?.post * 2 + data?.comment + `점`}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            {`좋아요: ${data?.follow}  게시글:${data?.post} 댓글:${data?.comment}`}
          </Typography>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
