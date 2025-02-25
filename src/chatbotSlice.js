import { createSlice } from '@reduxjs/toolkit'

//Init state
const initialState = {
    messages: [],
};

const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    }
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice;