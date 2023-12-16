import { configureStore } from '@reduxjs/toolkit';
import availableIngredientsReducer, {
  setAvailableIngredients
} from '../availableIngredientsSlicer';

describe('availableIngredientsSlicer', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: availableIngredientsReducer,
    });
  });

  test.each([
    [
      { isLoading: true, isError: true, isSuccess: true, data: [] },
      [], true, true, true,
    ],
    [
      { isLoading: false, isError: false, isSuccess: false, data: { data: [1, 2, 3] } },
      [1, 2, 3], false, false, false,
    ],
  ])(
    "'setAvailableIngredients' with payload %#",
    (payload, expectedData, expectedLoading, expectedError, expectedSuccess) => {
      store.dispatch(setAvailableIngredients(payload));

      const state = store.getState();
      expect(state.data).toEqual(expectedData);
      expect(state.isLoading).toEqual(expectedLoading);
      expect(state.isError).toEqual(expectedError);
      expect(state.isSuccess).toEqual(expectedSuccess);
    }
  );
});
