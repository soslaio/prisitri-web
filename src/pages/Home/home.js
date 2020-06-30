
import React, { useEffect, useState } from 'react';
import { Table, message, Skeleton, Button } from 'antd';
import { useSelector } from 'react-redux';

import StatusTag from '../../components/StatusTag/statusTag';
import { getExtendedUserOrders } from '../../services/api';
import { isAuthenticated } from '../../services/auth';


export default function () {

    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const cancelOrder = orderId => {
        console.log('>>>>>>>>>>', orderId);
    };



    const columns = [
        {
            title: 'Recurso/Profissional',
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
                return (
                    <StatusTag status={record.schedules[0].status} />
                )
            },
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (text, record) => (
                <Button type="link" block onClick={() => cancelOrder(record.id)}>
                    Cancelar
                </Button>
            ),
        },
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
                    {orders.length === 0 && <div>Você não possui solicitações</div>}
                    <Table dataSource={orders} columns={columns} rowKey={record => record.id} />
                </Skeleton>
            </div>
        </div>
    );
}
