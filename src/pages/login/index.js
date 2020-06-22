
import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import { login } from '../../services/auth';
import { useHistory } from 'react-router-dom';

import './login.scss';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

export default function () {

    const history = useHistory();

    const onFinish = async values => {
        try {
            await login(values.username, values.password);
            history.push('/');
        }
        catch (e) {
            message.error(e.message);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div id="login">
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Usuário"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Insira seu nome de usuário',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Insira sua senha',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Lembrar usuário</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
