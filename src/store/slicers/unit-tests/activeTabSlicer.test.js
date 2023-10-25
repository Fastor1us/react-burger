import { configureStore } from '@reduxjs/toolkit';
import activeTabReducer, {
  setTabState
} from '../activeTabSlicer';

describe('activeTabSlicer', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: activeTabReducer,
    });
  });

  test(`'setTabState'`, () => {
    const payload = { tab: 'Соусы', visiblePct: 50 };
    store.dispatch(setTabState(payload));

    const state = store.getState();
    expect(state[payload.tab]).toEqual(payload.visiblePct);
  });
});
