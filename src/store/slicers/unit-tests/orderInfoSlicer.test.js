import { configureStore } from '@reduxjs/toolkit';
import orderInfoReducer, {
  setOrderInfo
} from '../orderInfoSlicer';

describe('orderInfoReducer', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: orderInfoReducer,
    });
  });

  test.each([
    [
      { data: [], isSuccess: true }, [], true,
    ],
    [
      { data: [1, 2, 3], isSuccess: false }, [1, 2, 3], false,
    ],
  ])(
    "'setOrderInfo' with payload %#",
    (payload, expectedData, expectedIsSuccess) => {
      store.dispatch(setOrderInfo(payload));

      const state = store.getState();
      expect(state.data).toEqual(expectedData);
      expect(state.isSuccess).toEqual(expectedIsSuccess);
    }
  );
});
