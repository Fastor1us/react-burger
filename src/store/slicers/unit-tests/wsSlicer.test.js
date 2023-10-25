import { configureStore } from '@reduxjs/toolkit';
import wsReducer, {
  wsInit, wsClose, onOpen, onMessage, onError, onClose
} from '../wsSlicer';

describe('activeTabSlicer', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: wsReducer,
    });
  });

  const testResetStateToInit = (action) => {
    store.dispatch(action());
    expect(store.getState()).toEqual({
      isConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
    });
  }

  test(`'wsInit'`, () => {
    testResetStateToInit(wsInit);
  });

  test(`'wsClose'`, () => {
    testResetStateToInit(wsClose);
  });

  test(`'onMessage'`, () => {
    const payload = { orders: [1, 2], total: 3, totalToday: 4 };
    store.dispatch(onMessage(payload));

    const state = store.getState();
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toEqual(payload.total);
    expect(state.totalToday).toEqual(payload.totalToday);
  });

  test(`'onError'`, () => {
    const payload = 'error message';
    store.dispatch(onError(payload));

    const state = store.getState();
    expect(state.error).toEqual(payload);
  });

  test(`'onClose'`, () => {
    store.dispatch(onClose());
  });
});
