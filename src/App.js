
import React from 'react';
import { Switch } from 'react-router-dom';

import Login from './pages/Login/login';
import Resource from './pages/Order/order';
import MyOrders from './pages/MyOrders/myOrders';

import LoginLayoutRoute from './layouts/LoginLayout/loginLayout';
import CompanyLayoutRoute from './layouts/CompanyLayout/companyLayout';


export default function () {
    return (
        <Switch>
            <LoginLayoutRoute exact path="/login" component={Login} />
            <CompanyLayoutRoute exact path="/" component={MyOrders} />
            <CompanyLayoutRoute exact path="/solicitar" component={Resource} />
        </Switch>
    );
}
