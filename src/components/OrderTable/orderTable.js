
import React from 'react';
import { Table, Button } from 'antd';

import StatusTag from '../StatusTag/statusTag';


export default function ({ dataSource }) {

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
                <Button type="link" block onClick={() => cancelOrder(record.id)} disabled={record.schedules[0].status == 'cancelado'}>
                    Cancelar
                </Button>
            ),
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns} rowKey={record => record.id} />
    );
}
