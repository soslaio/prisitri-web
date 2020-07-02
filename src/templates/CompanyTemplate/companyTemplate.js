
import React from 'react';
import { Layout } from 'antd';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';

import './companyTemplate.scss';

const { Content } = Layout;


export default function (props) {
    return (
        <div id="companyLayout">
            <Layout>
                <Header />
                <Content>
                    <Breadcrumb />
                    <div className="company-content">
                        {props.children}
                    </div>
                </Content>
                <Footer />
            </Layout>
        </div>
    );
}
