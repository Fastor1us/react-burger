import {
  request, error,
  registerNewUserSuccess,
  loginInToUserAccSuccess,
  logoutFromUserAccSuccess,
  getUserInfoSuccess,
  patchUserDataSuccess
} from '../slicers/userSlicer';

import {
  registerNewUserApi,
  loginInToUserAccApi,
  logoutFromUserAccApi,
  getUserInfoApi,
  recoveryEmailSendApi,
  passwordResetApi,
  patchUserDataApi
} from '../../utils/api/user-api';

import { Dispatch } from '@reduxjs/toolkit';

type TGoToPage = (page: string) => void;


export function registerNewUserThunk(
  userInfo: { name: string, email: string, password: string }, goToPage: TGoToPage
) {
  return function (dispatch: Dispatch) {
    dispatch(request(true));
    registerNewUserApi(userInfo)
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(registerNewUserSuccess(data));
        dispatch(request(false));
        goToPage('/');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function loginInToUserAccThunk(
  userInfo: { email: string, password: string }, goToPage: TGoToPage
) {
  return function (dispatch: (action: any) => void) {
    dispatch(request(true));
    loginInToUserAccApi(userInfo)
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(loginInToUserAccSuccess(data));
        dispatch(request(false));
        goToPage('/');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function logoutFromUserAccThunk(goToPage: TGoToPage) {
  return function (dispatch: Dispatch) {
    dispatch(request(true));
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      logoutFromUserAccApi(refreshToken)
        .then((data) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(logoutFromUserAccSuccess(data));
          dispatch(request(false));
          goToPage('/');
        })
        .catch((err) => {
          dispatch(error(err));
        });
    } else {
      console.log('refreshToken is null when logout from user acc');
      dispatch(request(false));
      dispatch(error('refreshToken is null when logout from user acc'));
    }
  }
}

export function getUserInfoThunk() {
  return function (dispatch: Dispatch) {
    dispatch(request(true));
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getUserInfoApi(accessToken)
        .then((data) => {
          dispatch(getUserInfoSuccess(data));
          dispatch(request(false));
        })
        .catch((err) => {
          dispatch(error(err));
        });
    } else {
      console.log('accessToken is null when get user info');
      dispatch(request(false));
      dispatch(error('accessToken is null when get user info'));
    }
  }
}

export function recoveryEmailSendThunk(email: string, goToPage: TGoToPage) {
  return function (dispatch: Dispatch) {
    dispatch(request(true));
    recoveryEmailSendApi(email)
      .then(() => {
        dispatch(request(false));
        goToPage('/reset-password');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function passwordResetThunk(
  data: { password: string, token: string }, goToPage: TGoToPage
) {
  return function (dispatch: Dispatch) {
    dispatch(request(true));
    passwordResetApi(data)
      .then(() => {
        dispatch(request(false));
        goToPage('/login');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function patchUserDataThunk(
  accessToken: string | null, newUserData: { name?: string, email?: string, password?: string },
  goToPage: TGoToPage
) {
  return function (dispatch: Dispatch) {
    dispatch(request(true));
    if (accessToken) {
      patchUserDataApi(accessToken, newUserData)
        .then((data) => {
          dispatch(patchUserDataSuccess(data))
          dispatch(request(false));
          goToPage('/profile');
        })
        .catch((err) => {
          dispatch(error(err));
        });
    } else {
      console.log('accessToken is null when patch user data');
      dispatch(request(false));
      dispatch(error('accessToken is null when patch user data'));
    }
  }
}
