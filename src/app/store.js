import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import sidebarReducer from '../components/sidebar/sidebarSlice';
import chatReducer from '../components/chat-view/chatSlice';

export default configureStore({
  reducer: {
    userInfo: loginReducer,
    roomInfo: sidebarReducer,
    chatInfo: chatReducer
  },
});
