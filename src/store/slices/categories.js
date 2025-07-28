import { createSlice } from "@reduxjs/toolkit";
import { categoriesApi } from "../../services/categories";

const initialState = {
  category: [],
};

const slice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      categoriesApi.endpoints.getAllCateories.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.category = data?.items;
      }
    );
  },
});

export default slice.reducer;
