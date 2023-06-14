import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

interface AuthState {
  user: { profile: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, token }: AuthState = action.payload;
      if (state.user === null && state.token === null) {
        state.user = user;
        state.token = token;
        if (typeof token === "string") {
          sessionStorage.setItem("user", token);
        }
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.clear();
    },
    changeUserInfo: (state, action: PayloadAction<any>) => {
      if (action?.payload !== null) {
        const updateUserInfo = {
          ...state.user,
          [action?.payload.key]: action?.payload.value,
        };
        // @ts-ignore
        Object.assign(state?.user, updateUserInfo);
      }
    },
  },
});

export const { setCredentials, logOut, changeUserInfo } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
