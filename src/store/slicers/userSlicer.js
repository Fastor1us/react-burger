import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  request: false,
  error: null,
  isAuthChecked: false,
  user: {
    name: null,
    email: null
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
      state.user.name = null;
      state.user.email = null;
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

export default userSlicer.reducer;
