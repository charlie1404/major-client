import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';

import NotFound from './components/not-found';
import Login from './components/login';
import LandingPage from './components/landing-page';
import User from './components/user';

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Route exact path="/admin" component={App} /> */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root')
);

// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
