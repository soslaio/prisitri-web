
import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Resource from './pages/resource';
import ResourceType from './pages/resourceType';
import Login from './pages/login';
import { isAuthenticated } from './services/auth';

import './App.scss';

// Grampeia o método render do Route para adicionar a verificação de estar logado ou não.
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
        <div id="app">
            <Fragment>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/recursos/:resourceId" component={Resource} />
                    <PrivateRoute exact path="/tipos/:resourceTypeId" component={ResourceType} />
                </Switch>
            </Fragment>
        </div>
    );
}
