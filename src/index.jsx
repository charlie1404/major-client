import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';


import { store, history } from './store';
import NotFound from './components/not-found';
import LoadingComponent from './components/loading-component';
import PrivateRoute from './components/private-route';
import theme from './theme';

const App = React.lazy(() => import('./pages/app/app'));
const Login = React.lazy(() => import('./pages/login/login'));
const LandingPage = React.lazy(() => import('./pages/landing-page/home'));

ReactDOM.render(
  (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <PrivateRoute exact path="/app" component={LoadingComponent(App)} />
            <Route exact path="/" component={LoadingComponent(LandingPage)} />
            <Route exact path="/login" component={LoadingComponent(Login)} />
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
