import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

interface AuthState {
  user: string | null;
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
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// @ts-ignore
export const selectCurrentUser = (state: RootState) => state.auth.user;
// @ts-ignore
export const selectCurrentToken = (state: RootState) => state.auth.token;
