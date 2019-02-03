import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';

import App from './App';
import NotFound from './components/not-found';

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root')
);

// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
