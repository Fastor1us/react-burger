import { createSlice } from '@reduxjs/toolkit';
import { TIngredientItem } from '../../../interfaces/ingredient-item-type';

type TOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type TOrder = {
  ingredients: TIngredientItem[];
  _id: string;
  owner: TOwner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

type TData = {
  success: boolean;
  name: string;
  order: TOrder;
}

type TState = {
  data: TData | null;
  isSuccess: boolean;
}

const initialState: TState = { data: null, isSuccess: false };

const orderInfoSlicer = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    setOrderInfo(state, action) {
      state.data = action.payload.data || [];
      state.isSuccess = action.payload.isSuccess;
    },
  }
});

export const { setOrderInfo } = orderInfoSlicer.actions;

export default orderInfoSlicer.reducer;
