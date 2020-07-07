
import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';


export default function ({ status }) {

    const getIconFromStatus = status => {
        switch (status) {
            case 'pending':
                return (
                    <Tag color="geekblue">
                        <ClockCircleOutlined /> Pendente
                    </Tag>
                );
            case 'waiting_approval':
                return (
                    <Tag color="blue">
                        <ClockCircleOutlined /> Aguardando
                    </Tag>
                );
            case 'approved':
                return (
                    <Tag color="green">
                        <CheckCircleOutlined /> Aprovado
                    </Tag>
                );
            case 'partially_approved':
                return (
                    <Tag color="lime">
                        <CheckCircleOutlined /> Aprovado parcialmente
                    </Tag>
                );
            case 'canceled':
                return (
                    <Tag color="red">
                        <CloseCircleOutlined /> Cancelado
                    </Tag>
                );
            default:
                return (
                    <Tag>
                        <QuestionCircleOutlined /> Desconhecido
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
