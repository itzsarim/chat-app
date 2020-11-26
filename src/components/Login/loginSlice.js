import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
  },
  reducers: {
    setUsersName: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.name = action.payload;
    },
    setLoginTimestamp: (state, action) => {
      state.timestamp = action.payload;
    } 
  },
});

export const { setUsersName, setLoginTimestamp } = counterSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.user.name)`
export const selectCount = state => state.user.name;

export default counterSlice.reducer;
