import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import createLocalStorageMiddleware from './middlewares/local-storage';

const history = createBrowserHistory();
const historyMiddlewares = routerMiddleware(history);
// const localStorageMiddleware = createLocalStorageMiddleware();

const devMiddlewares = [createLogger()];
const middlewares = [
  historyMiddlewares,
  thunk,
  ...(process.env.NODE_ENV !== 'production' ? devMiddlewares : []),
  // localStorageMiddleware,
];

const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  }),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export { store, history };
