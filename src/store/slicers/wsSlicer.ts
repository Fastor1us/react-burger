import {
  createSlice,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload
} from '@reduxjs/toolkit';
import type { TSliceActions } from '../../../interfaces/slice-actions';

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
    wsInit(state, action) { },
    wsClose() { },
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
  wsInit, wsClose, onOpen, onMessage, onError, onClose
} = wsSlicer.actions;

export type TWsActionsRename = TSliceActions<typeof wsSlicer.actions>;

export type TWsActions = {
  wsInit: ActionCreatorWithPayload<{ wsUrl: string }, "wsSlicer/wsInit">,
  wsClose: ActionCreatorWithoutPayload<"wsSlicer/wsClose">,
  onOpen: ActionCreatorWithoutPayload<"wsSlicer/onOpen">,
  onMessage: ActionCreatorWithPayload<string, "wsSlicer/onMessage">,
  onError: ActionCreatorWithPayload<string, "wsSlicer/onError">,
  onClose: ActionCreatorWithoutPayload<"wsSlicer/onClose">,
};

export default wsSlicer.reducer;
