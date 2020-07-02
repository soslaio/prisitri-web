
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login/login';
import Resource from './pages/Order/order';
import MyOrders from './pages/MyOrders/myOrders';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ?
            (<Component {...props} />) :
            (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
        }
    />
);

export default function () {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={MyOrders} />
            <PrivateRoute exact path="/solicitar" component={Resource} />
        </Switch>
    );
}
