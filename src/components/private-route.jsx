import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (document.cookie) {
        const cookies = document.cookie.split('; ')
          .reduce((acc, curr) => {
            const [key, val] = curr.split('=');
            acc[key] = val;
            return acc;
          }, {});
        if (cookies.keepalive) {
          return <Component {...props} />;
        }
      }
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

export default PrivateRoute;
