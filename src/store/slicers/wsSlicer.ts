import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
}

const wsSlicer = createSlice({
  name: 'wsSlicer',
  initialState,
  reducers: {
    onOpen(state) {
      state.isConnected = true;
    },
    onMessage(state, action) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onError(state, action) {
      state.error = action.payload;
    },
    onClose(state) {
      state.isConnected = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = null;
    },
  }
});

export const {
  onOpen, onMessage, onError, onClose
} = wsSlicer.actions;

export default wsSlicer.reducer;
