
import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Resource from './pages/Resource/resource';
import Breadcrumb from './components/Breadcrumb/breadcrumb';
import ResourceType from './pages/ResourceType/resourceType';
import { isAuthenticated } from './services/auth';

import './App.scss';

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
        <Layout className="layout">
            <Header />
            <Content className="content">
                <Breadcrumb />
                <div className="site-layout-content">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        {/* <PrivateRoute exact path="/recursos/:resourceId" component={Resource} />
                        <PrivateRoute exact path="/tipos/:resourceTypeId" component={ResourceType} /> */}
                    </Switch>
                </div>
            </Content>
            <Footer />
        </Layout>
    );
}
