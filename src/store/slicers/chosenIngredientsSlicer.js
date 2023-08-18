import { createSlice } from '@reduxjs/toolkit';
import { v4 as makeUUIDv4 } from 'uuid';

const initialState = { bun: { price: 0 }, topping: [] };

const chosenIngredientsSlicer = createSlice({
  name: 'chosenIngredients',
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        // make an unique key for rendering in map
        // let newIngredientData = {};
        // Object.assign(newIngredientData, action.payload);
        // if (state.topping.length !== 0) {
        //   const allSortedKeys = state.topping.map(i=>i.key).sort((a, b) => { return a - b });
        //   if (allSortedKeys[allSortedKeys.length - 1] === state.topping.length - 1) {
        //     newIngredientData.key = state.topping.length;
        //   } else {
        //     newIngredientData.key = allSortedKeys.indexOf(
        //       allSortedKeys.find((item, index) => {
        //       return item !== index;
        //     }));
        //   }
        // } else {
        //   newIngredientData.key = 0;
        // }
        let newIngredientData = {};
        Object.assign(newIngredientData, action.payload);
        newIngredientData.key = makeUUIDv4();
        state.topping.push(newIngredientData);
      }
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
