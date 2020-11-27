import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
      messages: []
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  },
});

export const { setMessages } = chatSlice.actions;
export const selectMessages = state => state.chatInfo.messages ;

export default chatSlice.reducer;
