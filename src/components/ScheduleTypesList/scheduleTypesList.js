
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, Avatar, Skeleton, message } from 'antd';

import { getCompanyDetails } from '../../services/api';
import './scheduleTypesList.scss';


export default function ({ onClickHandler }) {
    const companyId = useSelector(state => state.companyId);

    const [loading, setLoading] = useState(false);
    const [resourceTypes, setResourceTypes] = useState([]);

    useEffect(() => {
        if (companyId) {
            setLoading(true);
            getCompanyDetails(companyId)
                .then(data => setResourceTypes(data.resource_types))
                .catch(() => message.error('Não foi possível consultar detalhes da empresa'))
                .finally(() => setLoading(false));
        }
    }, [companyId]);

    return (
        <div className="schedule-types-list">
            <Skeleton loading={loading} active>
                <List
                    bordered
                    size="small"
                    dataSource={resourceTypes}
                    renderItem={item => <List.Item className="list-icon">
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            onClick={() => onClickHandler(item)}
                            title={item.name}
                            description={item.description}
                        />
                    </List.Item>}
                />
            </Skeleton>
        </div>
    );
}
