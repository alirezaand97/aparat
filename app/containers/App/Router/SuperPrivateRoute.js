import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin, isLogin } from 'utils/auth';

const SuperPrivateRoute = ({ component: Component, ...rest }) => (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  <Route
    {...rest}
    render={props =>
      isLogin() && isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default SuperPrivateRoute;
