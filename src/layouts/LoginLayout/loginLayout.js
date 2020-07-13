
import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import './loginLayout.scss';

const { Content } = Layout;


const LoginLayout = ({ children }) => (
    <div id="login-layout">
        <Layout>
            <Content>
                {children}
            </Content>
        </Layout>
    </div>
);

export default function ({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            <LoginLayout>
                <Component {...props} />
            </LoginLayout>
        )} />
    )
};
