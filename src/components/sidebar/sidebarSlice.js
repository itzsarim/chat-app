import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'room',
  initialState: {
      rooms: []
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    }
  },
});

export const { setRooms } = sidebarSlice.actions;
export const selectRooms = state => state.roomInfo.rooms ;

export default sidebarSlice.reducer;
