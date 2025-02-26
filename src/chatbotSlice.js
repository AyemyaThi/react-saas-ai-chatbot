import { createSlice } from '@reduxjs/toolkit'

//Init state
const initialState = {
    messages: [],
    user: null,
};

const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
});

export const { addMessage, setUser } = chatbotSlice.actions;
export default chatbotSlice;