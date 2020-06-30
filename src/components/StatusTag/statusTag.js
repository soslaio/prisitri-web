
import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';


export default function ({ status }) {

    const getIconFromStatus = status => {
        switch (status) {
            case 'aprovado':
                return (
                    <Tag color="green">
                        <CheckCircleOutlined /> Aprovado
                    </Tag>
                );
            case 'cancelado':
                return (
                    <Tag color="red">
                        <CloseCircleOutlined /> Cancelado
                    </Tag>
                );
            default:
                return (
                    <Tag color="blue">
                        <ClockCircleOutlined /> Pendente
                    </Tag>
                );
        }
    }

    return (
        <React.Fragment>
            {getIconFromStatus(status)}
        </React.Fragment>
    );
}
