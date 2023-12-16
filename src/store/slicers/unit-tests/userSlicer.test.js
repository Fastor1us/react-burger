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

  const testUserAction = (action) => {
    const testUserData = { user: { name: 'John Doe', email: 'johndoe@example.com' } };
    store.dispatch(action(testUserData));

    const state = store.getState();
    expect(state.user.name).toEqual(testUserData.user.name);
    expect(state.user.email).toEqual(testUserData.user.email);
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
    testUserAction(registerNewUserSuccess);
  });

  test(`'loginInToUserAccSuccess'`, () => {
    testUserAction(loginInToUserAccSuccess);
  });

  test(`'logoutFromUserAccSuccess'`, () => {
    store.dispatch(logoutFromUserAccSuccess());

    const state = store.getState();
    expect(state.user.name).toEqual('');
    expect(state.user.email).toEqual('');
  });

  test(`'getUserInfoSuccess'`, () => {
    testUserAction(getUserInfoSuccess);
  });

  test(`'patchUserDataSuccess'`, () => {
    testUserAction(patchUserDataSuccess);
  });
});
