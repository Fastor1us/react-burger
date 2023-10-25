import { configureStore } from '@reduxjs/toolkit';
import chosenIngredientsReducer, {
  addIngredient,
} from '../chosenIngredientsSlicer';

describe('chosenIngredientsSlicer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: chosenIngredientsReducer,
    });
  });

  test(`'addIngredient' with type 'bun'`, () => {
    const bunPayload = { data: { type: 'bun', name: 'Burger Bun' } };
    store.dispatch(addIngredient(bunPayload.data));
    const state = store.getState();

    expect(state.bun).toEqual({
      key: expect.any(String),
      name: bunPayload.data.name,
      type: bunPayload.data.type,
    });
    expect(state.topping).toEqual([]);
  });

  test(`'addIngredient' with type 'topping'`, () => {
    const toppingPayload = { data: { type: 'topping', name: 'Cheese' } };
    store.dispatch(addIngredient(toppingPayload.data));

    const state = store.getState();

    expect(state.bun).toEqual({ price: 0 });
    expect(state.topping[0]).toEqual({
      ...toppingPayload.data,
      key: expect.any(String),
    });
  });
});
