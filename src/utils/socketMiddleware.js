import { onOpen, onMessage, onError, onClose } from '../store/slicers/wsSlicer';

export const socketMiddleware = () => {
  return (store => {
    let socket = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const wsUrl = action.payload?.wsUrl ?? 'wss://norma.nomoreparties.space/orders/all';
      let wsToken = null;

      if (action.payload && action.payload.token) {
        wsToken = action.payload.token.slice(7);
      }

      if (type === 'wsInit') {
        if (wsToken) {
          socket = new WebSocket(`${wsUrl}?token=${wsToken}`);
        } else {
          socket = new WebSocket(`${wsUrl}`);
        }
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen({ ...event }));
        };

        socket.onerror = event => {
          dispatch(onError({ ...event }));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(onMessage({ ...restParsedData }));
        };

        socket.onclose = event => {
          dispatch(onClose({ ...event }));
        };
      }

      if (type === 'wsClose') {
        socket.close();
      }

      next(action);
    };
  });
};
