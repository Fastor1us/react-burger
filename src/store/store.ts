import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { burgerAPI } from '../utils/api/burger-api';
import { socketMiddleware } from '../utils/socketMiddleware';

import availableIngredientsSlicer from './slicers/availableIngredientsSlicer';
import chosenIngredientsSlicer from './slicers/chosenIngredientsSlicer';
import orderInfoSlicer from './slicers/orderInfoSlicer';
import activeTabSlicer from './slicers/activeTabSlicer';
import userSlicer from './slicers/userSlicer';
import wsSlicer from './slicers/wsSlicer';

import { wsInit, wsClose, onOpen, onMessage, onError, onClose } from './slicers/wsSlicer';

import type { TWsActions } from './slicers/wsSlicer';


const rootReducer = combineReducers({
  availableIngredients: availableIngredientsSlicer,
  chosenIngredients: chosenIngredientsSlicer,
  orderInfo: orderInfoSlicer,
  activeTab: activeTabSlicer,
  userAccData: userSlicer,
  ws: wsSlicer,
  [burgerAPI.reducerPath]: burgerAPI.reducer,
});


const wsActions: TWsActions = { wsInit, wsClose, onOpen, onMessage, onError, onClose };

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(burgerAPI.middleware, socketMiddleware(wsActions))
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
// export type TRootState = ReturnType<typeof rootReducer>;
