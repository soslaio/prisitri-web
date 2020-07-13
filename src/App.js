
import React from 'react';
import { Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage/login';
import ResourcePage from './pages/OrderPage/order';
import MyOrdersPage from './pages/MyOrdersPage/myOrders';

import LoginLayoutRoute from './layouts/LoginLayout/loginLayout';
import CompanyLayoutRoute from './layouts/MainLayout/mainLayout';


export default function () {
    return (
        <Switch>
            <LoginLayoutRoute exact path="/login" component={LoginPage} />
            <CompanyLayoutRoute exact path="/" component={MyOrdersPage} />
            <CompanyLayoutRoute exact path="/solicitar" component={ResourcePage} />
        </Switch>
    );
}
