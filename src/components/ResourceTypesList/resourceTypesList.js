
import React from 'react';
import { List, Avatar } from 'antd';

import './resourceTypesList.scss';


export default function ({ resourceTypes, onClick = null, ...props }) {
    return (
        <div className="schedule-types-list">
            <List
                {...props}
                bordered
                size="small"
                dataSource={resourceTypes}
                renderItem={item => <List.Item className={onClick ? "list-icon" : ""}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.image} />}
                        onClick={onClick ? () => onClick(item) : null}
                        title={item.name}
                        description={item.description}
                    />
                </List.Item>}
            />
        </div>
    );
}
