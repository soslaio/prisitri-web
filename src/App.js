
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Resource from './pages/resource';
import ResourceType from './pages/resourceType';

import './App.scss';


export default function () {
    return (
        <div id="app">
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/recursos/:resourceId" component={Resource}></Route>
                    <Route exact path="/tipos/:uuid" component={ResourceType}></Route>
                </Switch>
            </Fragment>
        </div>
    );
}
