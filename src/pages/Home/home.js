
import React, { useEffect, useState } from 'react';
import { Table, message, Tooltip, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';


import { getExtendedUserOrders } from '../../services/api';
import { isAuthenticated } from '../../services/auth';


export default function () {

    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getIconFromStatus = status => {
        switch (status) {
            case 'aprovado':
                return (
                    <Tooltip placement="right" title={<span>aprovado</span>}>
                        <CheckCircleOutlined />
                    </Tooltip>
                );
            case 'cancelado':
                return (
                    <Tooltip placement="right" title={<span>cancelado</span>}>
                        <CloseCircleOutlined />
                    </Tooltip>
                );
            default:
                return (
                    <Tooltip placement="right" title={<span>pendente</span>}>
                        <ClockCircleOutlined />
                    </Tooltip>
                );
        }
    }

    const columns = [
        {
            title: 'Recurso',
            dataIndex: 'resource',
            render: (value, record) => {
                return (<span>{record.resource.name}</span>)
            },
        },
        {
            title: 'Horário',
            dataIndex: 'schedules',
            render: (value, record) => {
                return (<div>{record.schedules[0].start}</div>)
            },
        },
        {
            title: 'Status',
            dataIndex: 'schedules',
            render: (value, record) => {
                return (<div>{getIconFromStatus(record.schedules[0].status)}</div>)
            },
        }
    ];

    useEffect(() => {
        if (isAuthenticated()) {
            if (user) {
                getExtendedUserOrders(user.extended_user.id)
                    .then(data => setOrders(data))
                    .catch(() => message.error('Não foi possível carregar a lista de solicitações'))
                    .finally(() => setLoading(false));
            }
        }
    }, [user]);

    return (
        <div id="home">
            <h1>Minhas solicitações</h1>
            <div className="resource-types-list">
                <Skeleton loading={loading} active>
                    {orders.length == 0 && <div>Você não possui solicitações</div>}
                    <Table dataSource={orders} columns={columns} rowKey={record => record.id} />
                </Skeleton>
            </div>
        </div>
    );
}
