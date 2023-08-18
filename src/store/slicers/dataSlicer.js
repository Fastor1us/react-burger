import { createSlice } from '@reduxjs/toolkit';

const initialState = {data: [], isLoading: false, isError: false, isSuccess: false};

const dataSlicer = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload.data?.data || [];
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
      state.isSuccess = action.payload.isSuccess;
    },
  }
});

export const { setData } = dataSlicer.actions;

export default dataSlicer.reducer;
