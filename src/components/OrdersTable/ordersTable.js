
import React from 'react';
import { Table } from 'antd';

import StatusTag from '../StatusTag/statusTag';
import { formatLocaleDate } from '../../helpers/dateTime';


export default function ({ dataSource, loading }) {
    const columns = [
        {
            title: 'Recursos',
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
        }
    ];

    return <Table
        size="small"
        pagination={{ defaultPageSize: 8 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
        loading={loading}
    />
}
