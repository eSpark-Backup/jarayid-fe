import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data?.user;
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", data?.token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data?.user;
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", data?.token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data?.user;
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
    );
  },
});

export const { logout, updateUser } = slice.actions;

export default slice.reducer;
