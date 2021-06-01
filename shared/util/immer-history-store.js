import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { combineReducers } from 'redux-immer';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import produce from 'immer';

export const immerHistory = createBrowserHistory();

let { NODE_ENV, REDUX_DEVTOOLS } = process.env;

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(immerHistory);

const composeEnhancers = REDUX_DEVTOOLS
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export const buildImmerStore = ({
  customMiddlewares = [],
  initialState = {},
  reducers = {},
  sagas = {},
}) => {
  const middleware = [sagaMiddleware, routeMiddleware, ...customMiddlewares];

  let composed;
  if (NODE_ENV === 'development') {
    if (REDUX_DEVTOOLS) {
      composed = composeEnhancers(applyMiddleware(...middleware));
    } else {
      composed = composeEnhancers(applyMiddleware(...middleware, logger));
    }
  } else {
    composed = compose(applyMiddleware(...middleware));
  }

  const store = createStore(
    combineReducers(produce, {
      router: connectRouter(immerHistory),
      ...reducers,
    }),
    initialState,
    composed
  );

  sagas.map(item => {
    sagaMiddleware.run(item);
  });

  return store;
};
