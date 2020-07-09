
import React, { useEffect } from 'react';
import { Layout, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import { getUserDetails } from '../../actions';
import { getUsername } from '../../services/auth';

import './companyTemplate.scss';

const { Content } = Layout;


export default function (props) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            const username = getUsername();
            dispatch(getUserDetails(username))
                .catch(() => message.error('Não foi possível carregar os dados do usuário'))
        }
    });

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
