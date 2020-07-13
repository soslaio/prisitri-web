
import React from 'react';
import { Table } from 'antd';

import StatusTag from '../StatusTag/statusTag';
import { formatLocaleDate } from '../../helpers/dateTime';


export default function ({ orders, ...props }) {
    const columns = [
        {
            title: 'Recursos',
            dataIndex: 'resource',
            render: (_, record) => record.schedules.map(schedule => schedule.resource.resource_type.name).join(', ')
        },
        {
            title: 'Data da Solicitação',
            dataIndex: 'schedules',
            render: (_, record) => formatLocaleDate(record.created_at)
        },
        {
            title: 'Status',
            dataIndex: 'schedules',
            render: (_, record) => <StatusTag status={record.status} />,
        }
    ];

    return <Table
        {...props}
        size="small"
        pagination={{ defaultPageSize: 8 }}
        dataSource={orders}
        columns={columns}
        rowKey={record => record.id}
    />
}
