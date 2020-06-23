
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, Layout, Menu, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getUserDetails } from '../../actions';
import { getUsername, isAuthenticated } from '../../services/auth';

const { Header } = Layout;


export default function () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [companies, setCompanies] = useState([]);
    const [defaltCompany, setDefaultCompany] = useState(null);

    useEffect(() => {
        if (isAuthenticated()) {
            if (!user) {
                dispatch(getUserDetails(getUsername()))
                    .catch(() => message.error('Não foi possível carregar os dados do usuário'));
            }

            if (user) {
                setCompanies(user.extended_user.companies);
                if (user.extended_user.companies.length == 1) {
                    setDefaultCompany(user.extended_user.companies[0].id);
                }
            }
        }
    }, [user]);

    return (
        <Header>
            <div className="logo" />
            <div className="companies-list">
                {companies?.length > 0 &&
                    <Select
                        value={defaltCompany}
                        style={{ width: 200 }}
                        size="small"
                        options={companies?.map(company => {
                            return {
                                value: company.id,
                                label: company.name
                            }
                        })}
                    >
                    </Select>
                }
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/">
                        Home
            </Link>
                </Menu.Item>
                <Menu.Item key="2">Solicitar</Menu.Item>
                <Menu.Item key="3">Meus Pedidos</Menu.Item>
            </Menu>
        </Header>
    );
}
