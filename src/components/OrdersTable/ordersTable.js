
import React from 'react';
import { Table, Button, Popconfirm, Avatar, Space } from 'antd';

import StatusTag from '../StatusTag/statusTag';
import MaterialIcon from '../../assets/material.png';
import HumanIcon from '../../assets/human.png';
import { formatLocaleDateTime, formatPrettyPeriod } from '../../util';


export default function ({ dataSource }) {

    const cancelOrder = orderId => {
        console.log('>>>>>>>>>>', orderId);
    };

    const columns = [
        {
            title: 'Recurso/Profissional',
            dataIndex: 'resource',
            render: (value, record) => {
                const { name, nature, image } = record.resource.resource_type;
                return <Space>
                    {image && <Avatar src={image} size="small" />}
                    {nature === 'human' && <React.Fragment>
                        {!image && <Avatar src={HumanIcon} size="small" />}
                        <span>{name} ({record.resource.name})</span>
                    </React.Fragment>}
                    {nature === 'material' && <React.Fragment>
                        {!image && <Avatar src={MaterialIcon} size="small" />}
                        <span>{record.resource.name}</span>
                    </React.Fragment>}
                </Space>
            },
        },
        {
            title: 'Período',
            dataIndex: 'schedules',
            render: (value, record) => {
                const { start, end } = record.schedules[0];
                const { day, hour } = formatPrettyPeriod(start, end);
                return (
                    <React.Fragment>
                        <div style={{ fontWeight: 'bold' }}>{day}</div>
                        <span>{hour}</span>
                    </React.Fragment>
                );
            }
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
                    <Button type="link" block disabled={record.schedules[0].status === 'cancelado'}>
                        Cancelar
                </Button>
                </Popconfirm>
            ),
        },
    ];

    return <Table
        size="small"
        pagination={{ defaultPageSize: 8 }}
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
    />
}
