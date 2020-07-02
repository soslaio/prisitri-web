
import React from 'react';
import { Layout } from 'antd';

import './preTemplate.scss';

const { Content } = Layout;


export default function (props) {
    return (
        <div id="pre-layout">
            <Layout>
                <Content>
                    <div className="content">
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </div>
    );
}
