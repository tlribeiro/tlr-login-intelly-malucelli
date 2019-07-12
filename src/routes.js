import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';
import Home from './pages/Home';
import Login from './pages/Login/index.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
