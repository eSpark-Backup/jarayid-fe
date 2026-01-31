import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/lang";
import auth from "./slices/auth";
import category from "./slices/categories";
import { authApi } from "../services/auth";
import socialLinksReducer from "./slices/social";
import ChatbotSlice from "./slices/chatbot.js";
import font from "./slices/font-type";
import subscriptions from "./slices/subscription";

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth,
    category,
    socialLinks: socialLinksReducer,
    chatbot: ChatbotSlice,
    font: font,
    subscriptions: subscriptions,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
