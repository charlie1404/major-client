import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const historyMiddlewares = routerMiddleware(history);
// const localStorageMiddleware = store => next => (action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS: {
//       if (action.payload.data.token) {
//         localStorage.setItem('USER_AUTH_TOKEN', action.payload.data.token);
//         // TODO: Will be replaced by cookies
//       }
//       break;
//     }
//     case LOGOUT_SUCCESS: {
//       localStorage.setItem('USER_AUTH_TOKEN', '');
//       break;
//     }
//     default:
//   }
//   next(action);
// };

const middlewares = [
  historyMiddlewares,
  sagaMiddleware,
  // localStorageMiddleware,
];
if (process.env.NODE_ENV === 'production') {
  middlewares.push(createLogger());
}

const store = createStore(
  combineReducers({
    rootReducer,
    router: connectRouter(history),
  }),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export { store, history };
sagaMiddleware.run(rootSaga);
