import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/lang";
import auth from "./slices/auth";
import { authApi } from "../services/auth";

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
