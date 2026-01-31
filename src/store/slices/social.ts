import { createSlice } from "@reduxjs/toolkit";

const SocialLinksSlice = createSlice({
  name: "soicalLinks",
  initialState: {
    links: [],
  },
  reducers: {
    addLinks: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const { addLinks } = SocialLinksSlice.actions;
export default SocialLinksSlice.reducer;
