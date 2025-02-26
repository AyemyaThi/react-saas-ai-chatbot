import { configureStore } from "@reduxjs/toolkit";
import chatbotSlice from './chatbotSlice';
import authSlice from './authSlice';

export const { addMessage } = chatbotSlice.actions;
export const { setUser, logout } = authSlice.actions;
const store = configureStore({
    reducer: {
        chatbot: chatbotSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability check to prevent Firebase user object warning
        }),
});

export default store;