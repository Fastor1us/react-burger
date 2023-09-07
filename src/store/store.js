import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { burgerAPI } from '../utils/api/burger-api';

import availableIngredientsSlicer from './slicers/availableIngredientsSlicer';
import chosenIngredientsSlicer from './slicers/chosenIngredientsSlicer';
import orderInfoSlicer from './slicers/orderInfoSlicer';
import activeTabSlicer from './slicers/activeTabSlicer';
import userSlicer from './slicers/userSlicer';

const rootReducer = combineReducers({
  availableIngredients: availableIngredientsSlicer,
  chosenIngredients: chosenIngredientsSlicer,
  orderInfo: orderInfoSlicer,
  activeTab: activeTabSlicer,
  userAccData: userSlicer,
  [burgerAPI.reducerPath]: burgerAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(burgerAPI.middleware)
});

export default store;
