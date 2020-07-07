
import React from 'react';
import { Table, Button, Popconfirm, Avatar, Space } from 'antd';

import StatusTag from '../StatusTag/statusTag';
import MaterialIcon from '../../assets/material.png';
import HumanIcon from '../../assets/human.png';
import { formatLocaleDateTime, formatPrettyPeriod, formatLocaleDate } from '../../util';


export default function ({ dataSource, loading }) {

    const cancelOrder = orderId => {
        console.log('>>>>>>>>>>', orderId);
    };

    const columns = [
        {
            title: 'Recurso/Profissional',
            dataIndex: 'resource',
            render: (value, record) => record.schedules.map(schedule => schedule.resource.resource_type.name).join(', ')
        },
        {
            title: 'Data da Solicitação',
            dataIndex: 'schedules',
            render: (value, record) => formatLocaleDate(record.created_at)
        },
        {
            title: 'Status',
            dataIndex: 'schedules',
            render: (value, record) => <StatusTag status={record.status} />,
        },
        // {
        //     title: 'Ações',
        //     key: 'acoes',
        //     render: (text, record) => (
        //         <Popconfirm
        //             title="Tem certeza que deseja cancelar?"
        //             okText="Sim"
        //             cancelText="Não"
        //             onConfirm={() => { cancelOrder(record.id) }}
        //         >
        //             <Button type="link" block disabled={record.schedules[0].status === 'cancelado'}>
        //                 Cancelar
        //         </Button>
        //         </Popconfirm>
        //     ),
        // },
    ];

    return <Table
        size="small"
        pagination={{ defaultPageSize: 8 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
        loading={loading}
        className="components-table-demo-nested"
    />
}
