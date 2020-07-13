
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import { getUserDetails, getCompanyDetails } from '../../actions';
import { getUsername, isAuthenticated } from '../../services/auth';
import { companyId } from '../../config';

import './companyLayout.scss';

const { Content } = Layout;


const CompanyLayout = ({ children }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const company = useSelector(state => state.company);

    useEffect(() => {
        if (!user) {
            const username = getUsername();
            dispatch(getUserDetails(username))
                .catch(() => message.error('Não foi possível carregar os dados do usuário'));
        }

        if (!company) {
            dispatch(getCompanyDetails(companyId))
                .catch(() => message.error('Não foi possível carregar os dados da empresa'));
        }

        // eslint-disable-next-line
    }, []);

    return (
        <div id="companyLayout">
            <Layout>
                <Header />
                <Content>
                    <Breadcrumb />
                    <div className="company-content">
                        {children}
                    </div>
                </Content>
                <Footer />
            </Layout>
        </div>
    )
};

const CompanyLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => isAuthenticated() ?
            <CompanyLayout>
                <Component {...props} />
            </CompanyLayout> :
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        } />
    )
};

export default CompanyLayoutRoute;
