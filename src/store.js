import { configureStore } from "@reduxjs/toolkit";
import chatbotSlice from './chatbotSlice';

export const { addMessage, setUser } = chatbotSlice.actions;
const store = configureStore({
    reducer: {
        chatbot: chatbotSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability check to prevent Firebase user object warning
        }),
});

export default store;