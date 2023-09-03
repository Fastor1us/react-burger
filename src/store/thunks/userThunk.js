import { request, error, 
         registerNewUserSuccess,
         loginInToUserAccSuccess,
         logoutFromUserAccSuccess,
         getUserInfoSuccess,
         patchUserDataSuccess
       } from '../slicers/userSlicer';

import { registerNewUserApi,
         loginInToUserAccApi,
         logoutFromUserAccApi,
         getUserInfoApi,
         recoveryEmailSendApi,
         passwordResetApi,
         patchUserDataApi
 } from '../../utils/user-api';


export function registerNewUserThunk({name, email, password}, goToPage) {
  return function(dispatch) {
    dispatch(request(true));
    registerNewUserApi({name, email, password})
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

export function loginInToUserAccThunk({email, password}, goToPage) {
  return function(dispatch) {
    dispatch(request(true));
    loginInToUserAccApi({email, password})
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

export function logoutFromUserAccThunk(goToPage) {
  return function(dispatch) {
    dispatch(request(true));
    logoutFromUserAccApi(localStorage.getItem('refreshToken'))
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
  }
}

export function getUserInfoThunk() {
  return function(dispatch) {
    dispatch(request(true));
    getUserInfoApi(localStorage.getItem('accessToken'))
      .then((data) => {
        dispatch(getUserInfoSuccess(data));
        dispatch(request(false));
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function recoveryEmailSendThunk({email}, goToPage) {
  return function(dispatch) {
    dispatch(request(true));
    recoveryEmailSendApi({email})
      .then(() => {
        dispatch(request(false));
        goToPage('/reset-password');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function passwordResetThunk({password, token}, goToPage) {
  return function(dispatch) {
    dispatch(request(true));
    passwordResetApi({password, token})
      .then(() => {
        dispatch(request(false));
        goToPage('/login');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}

export function patchUserDataThunk(accessToken, newUserData, goToPage) {
  return function(dispatch) {
    dispatch(request(true));
    patchUserDataApi(accessToken, newUserData)
      .then((data) => {
        dispatch(patchUserDataSuccess(data))
        dispatch(request(false));
        goToPage('/profile');
      })
      .catch((err) => {
        dispatch(error(err));
      });
  }
}
