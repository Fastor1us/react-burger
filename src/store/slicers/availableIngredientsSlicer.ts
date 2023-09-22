import { createSlice } from '@reduxjs/toolkit';
import { TIngredientItem } from '../../../interfaces/ingredient-item-type';

type TState = {
  data: TIngredientItem[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: TState = { data: [], isLoading: false, isError: false, isSuccess: false };

const availableIngredientsSlicer = createSlice({
  name: 'availableIngredients',
  initialState,
  reducers: {
    setAvailableIngredients(state, action) {
      state.data = action.payload.data?.data || [];
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
      state.isSuccess = action.payload.isSuccess;
    },
  }
});

export const { setAvailableIngredients } = availableIngredientsSlicer.actions;

export default availableIngredientsSlicer.reducer;
