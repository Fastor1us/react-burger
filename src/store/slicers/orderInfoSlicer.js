import { createSlice } from '@reduxjs/toolkit';

const initialState = {data: [], isSuccess: false};

const orderInfoSlicer = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    setOrderInfo(state, action) {
      state.data = action.payload.data || [];
      state.isSuccess = action.payload.isSuccess;
    },
  }
});

export const { setOrderInfo } = orderInfoSlicer.actions;

export default orderInfoSlicer.reducer;
