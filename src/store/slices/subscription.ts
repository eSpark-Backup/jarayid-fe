import { createSlice } from "@reduxjs/toolkit";
import { paymentApi } from "../../services/payment";

const languageSlice = createSlice({
  name: "subscriptions",
  initialState: {
    subscriptions: [],
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      paymentApi.endpoints.getPlans.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.subscriptions = data?.plans;
      }
    );
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
