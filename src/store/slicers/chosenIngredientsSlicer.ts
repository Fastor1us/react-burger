import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredientItem } from '../../../interfaces/ingredient-item-type';
import type { TSliceActions } from '../../../interfaces/slice-actions';

type TState = {
  bun: {
    price: number;
    name?: '';
    image?: '';
  } | TIngredientItem;
  topping: TIngredientItem[];
}

const initialState: TState = { bun: { price: 0 }, topping: [] };

const chosenIngredientsSlicer = createSlice({
  name: 'chosenIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        if (action.payload.data.type === 'bun') {
          state.bun = action.payload.data;
        } else {
          state.topping.push(action.payload.data);
        }
      },
      prepare: (data: TIngredientItem): any => {
        const key = nanoid();
        const newData = { ...data, key };
        return { payload: { data: newData } };
      },
    },
    removeIngredient(state, action) {
      state.topping.splice(action.payload, 1);
    },
    changeIngredientPosition(state, action) {
      const elemToMove = state.topping.splice(action.payload.prevIndex, 1);
      state.topping.splice(action.payload.newIndex, 0, elemToMove[0]);
    },
    resetChosenIngredientStore() {
      return { bun: { price: 0, name: '', image: '' }, topping: [] }
    }
  },
});

export const { addIngredient,
  removeIngredient,
  changeIngredientPosition,
  resetChosenIngredientStore } = chosenIngredientsSlicer.actions;

export type TChosenIngredientsActions = TSliceActions<typeof chosenIngredientsSlicer.actions>;

export default chosenIngredientsSlicer.reducer;
