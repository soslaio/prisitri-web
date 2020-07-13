
import React from 'react';
import { List, Avatar } from 'antd';

import './scheduleTypesList.scss';


export default function ({ dataSource, onClick, ...props }) {

    return (
        <div className="schedule-types-list">
            <List
                {...props}
                bordered
                size="small"
                dataSource={dataSource}
                renderItem={item => <List.Item className="list-icon">
                    <List.Item.Meta
                        avatar={<Avatar src={item.image} />}
                        onClick={() => onClick(item)}
                        title={item.name}
                        description={item.description}
                    />
                </List.Item>}
            />
        </div>
    );
}
