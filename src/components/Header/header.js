
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import UserMenu from '../../components/UserMenu/userMenu';
import CompanySelect from '../../components/CompanySelect/companySelect';

const { Header } = Layout;


export default function () {
    return (
        <Header>
            <div className="logo" />
            <div className="companies-list">
                <CompanySelect />
                <UserMenu />
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/">
                        Minhas Solicitações
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/solicitar">
                        Solicitar
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}
