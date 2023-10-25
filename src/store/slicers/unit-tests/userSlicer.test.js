import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  request, error,
  registerNewUserSuccess,
  loginInToUserAccSuccess,
  logoutFromUserAccSuccess,
  getUserInfoSuccess,
  patchUserDataSuccess,
} from '../userSlicer';

describe('userSlicer', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: userReducer,
    });
  });

  const testUserAction = (action, payload) => {
    store.dispatch(action(payload));

    const state = store.getState();
    expect(state.user.name).toEqual(payload.user.name);
    expect(state.user.email).toEqual(payload.user.email);
  };

  test(`'request'`, () => {
    const payload = true;
    store.dispatch(request(payload));

    const state = store.getState();
    expect(state.request).toEqual(payload);
    expect(state.error).toEqual(null);
  });

  test(`'error'`, () => {
    const payload = { message: 'error message' };
    store.dispatch(error(payload));

    const state = store.getState();
    expect(state.error).toEqual(payload.message);
    expect(state.request).toEqual(false);
  });

  test(`'registerNewUserSuccess'`, () => {
    const payload = { user: { name: 'John Doe', email: 'johndoe@example.com' } };
    testUserAction(registerNewUserSuccess, payload);
  });

  test(`'loginInToUserAccSuccess'`, () => {
    const payload = { user: { name: 'John Doe', email: 'johndoe@example.com' } };
    testUserAction(loginInToUserAccSuccess, payload);
  });

  test(`'logoutFromUserAccSuccess'`, () => {
    store.dispatch(logoutFromUserAccSuccess());

    const state = store.getState();
    expect(state.user.name).toEqual('');
    expect(state.user.email).toEqual('');
  });

  test(`'getUserInfoSuccess'`, () => {
    const payload = { user: { name: 'John Doe', email: 'johndoe@example.com' } };
    testUserAction(getUserInfoSuccess, payload);
  });

  test(`'patchUserDataSuccess'`, () => {
    const payload = { user: { name: 'John Doe', email: 'johndoe@example.com' } };
    testUserAction(patchUserDataSuccess, payload);
  });
});
