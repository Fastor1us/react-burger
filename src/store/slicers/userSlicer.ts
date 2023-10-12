import { createSlice } from '@reduxjs/toolkit';
import type { TSliceActions } from '../../../interfaces/slice-actions';

type TState = {
  request: boolean;
  error: boolean | null;
  isAuthChecked: boolean;
  user: {
    name: string;
    email: string;
    [key: string]: string;
  };
}

const initialState: TState = {
  request: false,
  error: null,
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
};

const userSlicer = createSlice({
  name: 'userSlicer',
  initialState,
  reducers: {
    request(state, action) {
      state.request = action.payload;
      state.error = null;
    },
    error(state, action) {
      state.error = action.payload.message;
      state.request = false;
    },
    registerNewUserSuccess(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
    loginInToUserAccSuccess(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
    logoutFromUserAccSuccess(state) {
      state.user.name = '';
      state.user.email = '';
    },
    getUserInfoSuccess(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
    patchUserDataSuccess(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
  }
});

export const {
  request, error,
  registerNewUserSuccess,
  loginInToUserAccSuccess,
  logoutFromUserAccSuccess,
  getUserInfoSuccess,
  patchUserDataSuccess
} = userSlicer.actions;

export type TUserActions = TSliceActions<typeof userSlicer.actions>;

export default userSlicer.reducer;
