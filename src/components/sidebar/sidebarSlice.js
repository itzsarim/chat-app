import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'room',
  initialState: {
      rooms: [],
      selectedRoomId: ''
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setSelectedRoomId: (state, action) => {
      state.selectedRoomId = action.payload;
    }
  },
});

export const { setRooms, setSelectedRoomId } = sidebarSlice.actions;
export const selectRooms = state => state.roomInfo.rooms ;
export const selectRoomId = state => state.roomInfo.selectedRoomId;

export default sidebarSlice.reducer;
