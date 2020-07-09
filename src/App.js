
import React, { useEffect } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login/login';
import Resource from './pages/Order/order';
import MyOrders from './pages/MyOrders/myOrders';
import { companyId } from './config';
import { getCompanyDetails } from './actions';
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

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompanyDetails(companyId))
            .catch(() => message.error('Não foi possível carregar os dados da empresa'))
    // eslint-disable-next-line
    }, [companyId]);

    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={MyOrders} />
            <PrivateRoute exact path="/solicitar" component={Resource} />
        </Switch>
    );
}
