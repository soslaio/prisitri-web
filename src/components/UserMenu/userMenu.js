
import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Popover, List, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logoff } from '../../services/auth';


export default function () {

    const user = useSelector(state => state.user);

    const logoffClick = () => {
        logoff();
        window.location.reload(false);
    };

    const content = (
        <div>
            <List size="small">
                <List.Item>
                    <Button type="link" block onClick={() => logoffClick()}>
                        Efetuar logoff
                    </Button>
                </List.Item>
            </List>
        </div>
    );

    return (
        <React.Fragment>
            {user &&
                <Popover placement="bottomRight" content={content} trigger="click">
                    <Avatar size="large" icon={<UserOutlined />} style={{ marginLeft: '16px', cursor: 'pointer' }} />
                </Popover>
            }
        </React.Fragment>
    );
}
