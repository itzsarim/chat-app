import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';

export default configureStore({
  reducer: {
    userInfo: loginReducer,
  },
});
