
import React from 'react';
import { Layout } from 'antd';

import './preTemplate.scss';

const { Content } = Layout;


export default function (props) {
    return (
        <Layout>
            <Content className={props.className}>
                {props.children}
            </Content>
        </Layout>
    );
}
