import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontType: "regular",
};

const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFontType: (state, action) => {
      state.fontType = action.payload;
    },
  },
});

export const { setFontType } = fontSlice.actions;
export default fontSlice.reducer;
