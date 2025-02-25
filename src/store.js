import { configureStore } from "@reduxjs/toolkit";
import chatbotSlice from './chatbotSlice';

export const { addMessage } = chatbotSlice.actions;
const store = configureStore({ reducer: { chatbot: chatbotSlice.reducer } });

export default store;