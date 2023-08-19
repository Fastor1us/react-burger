import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { bun: { price: 0 }, topping: [] };

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
      prepare: (payload) => {
        let data = {};
        Object.assign(data, payload);
        data.key = nanoid();
        return { payload: { data }}
      },
    },
    removeIngredient(state, action) {
      state.topping.splice(action.payload, 1);
    },
    changeIngredientPosition(state, action) {
      const elemToMove = state.topping.splice(action.payload.prevIndex, 1);
      state.topping.splice(action.payload.newIndex, 0, elemToMove[0]);
    }
  },
});

export const { addIngredient, 
               removeIngredient, 
               changeIngredientPosition } = chosenIngredientsSlicer.actions;

export default chosenIngredientsSlicer.reducer;
