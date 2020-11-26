import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/Login/loginSlice';

export default configureStore({
  reducer: {
    userInfo: loginReducer,
  },
});
