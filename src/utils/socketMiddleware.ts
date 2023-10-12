import type { TActiveTabActions } from '../store/slicers/activeTabSlicer';
import type { TAvailableIngredientsActions } from '../store/slicers/availableIngredientsSlicer';
import type { TChosenIngredientsActions } from '../store/slicers/chosenIngredientsSlicer';
import type { TOrderInfoActions } from '../store/slicers/orderInfoSlicer';
import type { TUserActions } from '../store/slicers/userSlicer';
import type { TWsActionsRename, TWsActions } from '../store/slicers/wsSlicer';

import { Middleware, MiddlewareAPI, ThunkDispatch } from '@reduxjs/toolkit';

import type { TRootState } from '../store/store';


type TAllActions = TActiveTabActions | TAvailableIngredientsActions |
  TChosenIngredientsActions | TOrderInfoActions | TUserActions | TWsActionsRename;

type TAppDispatch = ThunkDispatch<TRootState, unknown, TAllActions>;


export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAllActions) => {
      const { dispatch } = store;
      const { wsInit, wsClose, onOpen, onError, onMessage, onClose } = wsActions;

      if (wsInit.match(action)) {
        socket = new WebSocket(action.payload.wsUrl);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError(event.type.toString()));
        };

        socket.onmessage = event => {
          const parsedData = JSON.parse(event.data);
          const { success, ...restParsedData } = parsedData;
          dispatch(onMessage({ ...restParsedData }));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };
      }

      if (wsClose.match(action) && socket) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  }) as Middleware;
};
