
import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

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
                const { name, nature } = record.resource.resource_type;
                return (<React.Fragment>
                    {nature == 'human' && <span>{name} ({record.resource.name})</span>}
                    {nature == 'material' && <span>{record.resource.name}</span>}
                </React.Fragment>)
            },
        },
        {
            title: 'Horário',
            dataIndex: 'schedules',
            render: (value, record) => <span>{record.schedules[0].start}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'schedules',
            render: (value, record) => <StatusTag status={record.schedules[0].status} />,
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (text, record) => (
                <Popconfirm
                    title="Tem certeza que deseja cancelar?"
                    okText="Sim"
                    cancelText="Não"
                    onConfirm={() => { cancelOrder(record.id) }}
                >
                    <Button type="link" block disabled={record.schedules[0].status == 'cancelado'}>
                        Cancelar
                </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns} rowKey={record => record.id} />
    );
}
