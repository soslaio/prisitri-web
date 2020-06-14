
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Resource from './pages/resource';
import ResourceType from './pages/resourceType';


export default function () {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/recursos/:uuid" component={Resource}></Route>
                <Route exact path="/tipos/:uuid" component={ResourceType}></Route>
            </Switch>
        </Fragment>
    );
}
