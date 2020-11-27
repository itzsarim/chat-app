import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'room',
  initialState: {
      rooms: [{name:'', id:'', users: []}],
      selectedRoomId: 0
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setSelectedRoomId: (state, action) => {
      state.selectedRoomId = action.payload;
    },
    setRoomDetails: (state, action) => {
      state.rooms = state.rooms.map((room) => {
        if(room.id === action.payload.id) {
          room.users = action.payload.users;
        }
        return room;
      })
    }
  },
});

export const { setRooms, setSelectedRoomId, setRoomDetails } = sidebarSlice.actions;
export const selectRooms = state => state.roomInfo.rooms ;
export const selectRoomId = state => state.roomInfo.selectedRoomId;
export const selectRoomDetailForId = state => state.roomInfo.rooms.filter((room) => room.id === state.roomInfo.selectedRoomId);

export default sidebarSlice.reducer;