
import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import UserMenu from '../../components/UserMenu/userMenu';
import UnitSelect from '../../components/UnitSelect/unitSelect';

import './header.scss';

const { Header } = Layout;


export default function () {

    const location = useLocation();
    const company = useSelector(state => state.company);
    const [selectedKeys, setSelectedKeys] = useState(null);

    useEffect(() => {
        const selectedKey = location.pathname !== '/' ? location.pathname.replace('/', '') : 'home';
        setSelectedKeys(selectedKey);
    }, [location]);

    return (
        <Header>
            <div className="companies-list">
                <UnitSelect />
                <UserMenu />
            </div>
            <div className="logo">
                {company?.logo && <Avatar src={company?.logo}
                    size={55}
                    style={{
                        marginRight: '26px',
                        backgroundColor: 'white'
                    }} />}
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
