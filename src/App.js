
import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/home';
import MyOrders from './pages/MyOrders/myOrders';
import Login from './pages/Login/login';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Resource from './pages/Order/order';
import Breadcrumb from './components/Breadcrumb/breadcrumb';
import { isAuthenticated } from './services/auth';

// import './App.scss';

const { Content } = Layout;
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
