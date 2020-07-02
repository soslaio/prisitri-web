
import React from 'react';
import { Layout } from 'antd';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';

import './companyTemplate.scss';

const { Content } = Layout;


export default function (props) {
    return (
        // <Layout className="layout">
        //     <Header />
        //     <Content className="content">
        //         <Breadcrumb />
        //         <div className="site-layout-content">
        //             {props.children}
        //         </div>
        //     </Content>
        //     <Footer />
        // </Layout>
        <Layout>
            <Header />
            <Content className={props.className}>
                <Breadcrumb />
                {props.children}
            </Content>
        </Layout>
    );
}
