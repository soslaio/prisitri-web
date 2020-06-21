
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Calendar } from 'antd';
import { useParams } from 'react-router';
import { List, Divider } from 'antd';
import { Steps, Button, message } from 'antd';
import { Form, Input } from 'antd';

import { getAvailableSchedules, getResourceDetails, postOrderWithSchedules } from '../../services/api';
import { loggedExtendedUserId } from '../../config';
import ptBrLocale from '../../locale.json';
import './resource.scss';

const { Step } = Steps;


export default function () {
    // parameters
    const { resourceId } = useParams();

    // objects
    const [resource, setResource] = useState(null);
    const [scheduleType, setScheduleType] = useState(null);
    const [schedule, setSchedule] = useState(null);

    // lists
    const [avaiableShedules, setAvaiableShedules] = useState([]);

    // ui auxiliar
    const defaultDate = moment('2020-06-14');
    const [value, setValue] = useState(defaultDate);
    const [avaiableDates, setAvaiableDates] = useState(['2020-06-17', '2020-06-24', '2020-06-30']);
    const [current, setCurrent] = useState(0);

    const disableDate = (currentDate) => {
        const fCurrentDate = currentDate.format('YYYY-MM-DD');
        return !avaiableDates.includes(fCurrentDate);
    };

    const scheduleTypeClick = async scheduleType => {
        try {
            const fetchResult = await getAvailableSchedules(resourceId, scheduleType.id);
            setAvaiableShedules(fetchResult);
            setScheduleType(scheduleType);
            next();
        }
        catch (e) {
            message.error('Não foi possível carregar os horários disponíveis');
        }
    };

    const scheduleClick = schedule => {
        setSchedule(schedule);
        next();
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = values => {
        const scheduleData = {
            start: schedule.start_iso,
            end: schedule.end_iso,
            status: 'pendente'
        }
        try {
            const data = {
                resource: resource.id,
                requester: loggedExtendedUserId,
                notes: values.notes,
                schedules: [scheduleData]
            };
            postOrderWithSchedules(data);
            message.success('Solicitação inserida com sucesso');
        }
        catch (e) {
            message.error('Não foi possível criar sua solicitação');
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const fetchResult = await getResourceDetails(resourceId);
                setResource(fetchResult);
            }
            catch (e) {
                message.error('Não foi possível carregar os tipos de agendas');
            }
        })();
    }, []);

    const steps = [
        {
            title: 'Tipo',
            content: <div>
                <Divider orientation="left">Tipo de Agenda</Divider>
                <List
                    size="small"
                    bordered
                    dataSource={resource?.schedule_types}
                    renderItem={item => <List.Item>
                        <Button type="link" block onClick={() => scheduleTypeClick(item)}>
                            {item.name}
                        </Button>
                    </List.Item>}
                />
            </div>,
        },
        {
            title: 'Horário',
            content: <div>
                <Divider orientation="left">Horários disponíveis</Divider>
                <List
                    size="small"
                    bordered
                    dataSource={avaiableShedules}
                    renderItem={schedule => <List.Item>
                        <Button type="link" block onClick={() => scheduleClick(schedule)}>
                            {schedule.start} - {schedule.end}
                        </Button>
                    </List.Item>}
                />
            </div>,
        },
        {
            title: 'Informações',
            content: <div>
                <Divider orientation="left">Informações</Divider>
                <div>
                    {scheduleType?.name}
                </div>
                <div>
                    {schedule?.start} - {schedule?.end}
                </div>
                <Form.Item
                    label="Observação"
                    name="notes"
                    rules={[{ required: true, message: 'Insira uma observação para sua solicitação' }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </div>,
        },
    ];

    return (
        <div id="resource">
            <h1>{resource?.name}</h1>

            <Row>
                <Col span={12}>
                    <div className="site-calendar">
                        <Calendar locale={ptBrLocale} fullscreen={false} value={value} disabledDate={disableDate} />
                    </div>
                </Col>
                <Col span={12}>
                    <Form onFinish={onFinish}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Voltar
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" htmlType="submit">
                                    Finalizar
                                </Button>
                            )}
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
