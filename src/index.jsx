import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { store, history } from './store';
import NotFound from './components/not-found';
import Login from './components/login';
import LandingPage from './components/landing-page';
import App from './components/app';
import PrivateRoute from './components/private-route';
import theme from './theme';

ReactDOM.render(
  (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <PrivateRoute exact path="/app" component={App} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);

// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
