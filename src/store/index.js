import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/lang";
import auth from "./slices/auth";
import category from "./slices/categories";
import { authApi } from "../services/auth";
import socialLinksReducer from "./slices/social";

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth,
    category,
    socialLinks: socialLinksReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
