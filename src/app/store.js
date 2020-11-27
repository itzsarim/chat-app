import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import sidebarReducer from '../components/sidebar/sidebarSlice';

export default configureStore({
  reducer: {
    userInfo: loginReducer,
    roomInfo: sidebarReducer
  },
});
