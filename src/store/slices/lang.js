import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: "en",
  reducers: {
    changeLanguage: (state, action) => action.payload,
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
