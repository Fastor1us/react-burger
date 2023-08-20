import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataAPI } from '../components/utils/api';

import availableIngredientsSlicer from './slicers/availableIngredientsSlicer';
import chosenIngredientsSlicer from './slicers/chosenIngredientsSlicer';
import orderInfoSlicer from './slicers/orderInfoSlicer';
import activeTabSlicer from './slicers/activeTabSlicer';

const rootReducer = combineReducers({
  availableIngredients: availableIngredientsSlicer,
  chosenIngredients: chosenIngredientsSlicer,
  orderInfo: orderInfoSlicer,
  activeTab: activeTabSlicer,
  [dataAPI.reducerPath]: dataAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dataAPI.middleware)
});

export default store;
