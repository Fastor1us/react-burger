import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const activeTabSlicer = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    setTabState(state, action) {
      state[action.payload.tab] = action.payload.visiblePct;
    },
  }
});

export const { setTabState } = activeTabSlicer.actions;

export default activeTabSlicer.reducer;
