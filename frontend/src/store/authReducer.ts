import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

import { getState, saveState } from "./global";

type AuthType = {
  loggedIn: boolean;
  userId: string;
  accessToken: string;
};

const AuthInitialState: AuthType = {
  loggedIn: false,
  userId: "",
  accessToken: "",
};

const cacheSlice = createSlice({
  name: "cache",
  initialState: getState<AuthType>("auth", AuthInitialState),
  reducers: {
    login(
      state,
      {
        payload,
      }: PayloadAction<{
        userId: string;
        accessToken: string;
      }>
    ) {
      state.loggedIn = true;
      state.userId = payload.userId;
      state.accessToken = payload.accessToken;

      saveState("auth", current(state));
    },
    logout(state) {
      state.loggedIn = false;
      state.userId = "";
      state.accessToken = "";

      saveState("auth", current(state));
    },
  },
});

export const { login, logout } = cacheSlice.actions;

export default cacheSlice.reducer;
