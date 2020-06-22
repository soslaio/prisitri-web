
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Resource from './pages/resource';
import ResourceType from './pages/resourceType';
import Login from './pages/login';
import { isAuthenticated } from './services/auth';

import './App.scss';

const { Header, Content, Footer } = Layout;

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
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Solicitar</Menu.Item>
                    <Menu.Item key="3">Meus Pedidos</Menu.Item>
                </Menu>
            </Header>
            <Content className="content">
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/recursos/:resourceId" component={Resource} />
                        <PrivateRoute exact path="/tipos/:resourceTypeId" component={ResourceType} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}
