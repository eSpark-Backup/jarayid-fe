import { createSlice } from "@reduxjs/toolkit";

const ChatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    value: "",
  },
  reducers: {
    addSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSearch } = ChatbotSlice.actions;
export default ChatbotSlice.reducer;
