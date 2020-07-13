
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';

import { getUserDetails, login } from '../../actions';
import Logo from '../../assets/prisitri-logo.png';
import './login.scss';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

export default function () {

    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onFinish = values => {
        setLoading(true);
        login(values.username, values.password)
            .then(() => {
                dispatch(getUserDetails(values.username))
                    .then(() => {
                        setLoading(false);
                        history.push('/')
                    })
            })
            .catch(error => {
                setLoading(false);
                if (error instanceof TypeError) {
                    message.error('Não foi possível efetuar a autenticação');
                    console.log(error);
                }
                else {
                    message.error(error.message);
                    console.log(error);
                }
            });
    };

    return (
        <div id="login">
            <Row>
                <Col span={24}>
                    <div className="logo">
                        <img alt="prisitri" src={Logo} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>


                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
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
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Entrar
                    </Button>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>


        </div>
    );
}
