
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import UserMenu from '../../components/UserMenu/userMenu';
import CompanySelect from '../../components/CompanySelect/companySelect';

const { Header } = Layout;


export default function () {

    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState(null);

    useEffect(() => {
        const selectedKey = location.pathname != '/' ? location.pathname.replace('/', '') : 'home';
        setSelectedKeys(selectedKey);
    }, [location]);

    return (
        <Header>
            <div className="logo" />
            <div className="companies-list">
                <CompanySelect />
                <UserMenu />
            </div>
            <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
                <Menu.Item key="home">
                    <Link to="/">
                        Minhas Solicitações
                    </Link>
                </Menu.Item>
                <Menu.Item key="solicitar">
                    <Link to="/solicitar">
                        Solicitar
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}
