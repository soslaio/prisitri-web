
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Calendar } from 'antd';
import { useParams } from 'react-router';
import { List, Divider } from 'antd';
import { Steps, Button, message } from 'antd';
import { Form, Input, Popconfirm } from 'antd';

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
    const [form] = Form.useForm();
    const [value, setValue] = useState(defaultDate);
    const [avaiableDates, setAvaiableDates] = useState(['2020-06-17', '2020-06-24', '2020-06-30']);
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const scheduleTypeClick = async scheduleType => {
        try {
            const fetchResult = await getAvailableSchedules(resourceId, scheduleType.id);
            setAvaiableShedules(fetchResult);
            setScheduleType(scheduleType);
            nextStep();
        }
        catch (e) {
            message.error('Não foi possível carregar os horários disponíveis');
        }
    };

    const scheduleClick = schedule => {
        setSchedule(schedule);
        nextStep();
    };

    const clearForm = () => {
        setScheduleType(null);
        setSchedule(null);
        setCurrentStep(0);
        form.resetFields();
    };

    const onFinish = values => {
        const scheduleData = {
            start: schedule.start,
            end: schedule.end,
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
            clearForm();
            message.success('Solicitação inserida com sucesso');
        }
        catch (e) {
            message.error('Não foi possível criar sua solicitação');
            console.log(e);
        }
    };

    const disableDate = (currentDate) => {
        const fCurrentDate = currentDate.format('YYYY-MM-DD');
        return !avaiableDates.includes(fCurrentDate);
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

    const formatLocaleDate = ISODateTimeString => {
        const dateObj = new Date(ISODateTimeString);
        return dateObj.toLocaleDateString(navigator.language);
    };

    const formatLocaleTime = ISODateTimeString => {
        const dateObj = new Date(ISODateTimeString);
        return dateObj.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    };

    const formatLocaleDateTime = ISODateTimeString => {
        return `${formatLocaleDate(ISODateTimeString)} - ${formatLocaleTime(ISODateTimeString)}`;
    }

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
                            {formatLocaleTime(schedule.start)} - {formatLocaleTime(schedule.end)}
                        </Button>
                    </List.Item>}
                />
            </div>,
        },
        {
            title: 'Informações',
            content: <div>
                <Divider orientation="left">Informações</Divider>
                <Form.Item label="Tipo">
                    <div>{scheduleType?.name}</div>
                </Form.Item>
                <Form.Item label="Horário">
                    <div>
                        {formatLocaleDateTime(schedule?.start)} até<br /> {formatLocaleDateTime(schedule?.end)}
                    </div>
                </Form.Item>
                <Form.Item
                    label="Observação"
                    name="notes"
                >
                    <Input.TextArea />
                </Form.Item>
            </div>,
        },
    ];

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

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
                    <Form {...layout} onFinish={onFinish} form={form}>
                        <Steps current={currentStep}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[currentStep].content}</div>
                        <div className="steps-action">
                            {currentStep > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => previousStep()}>
                                    Voltar
                                </Button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <Popconfirm
                                    title="Confirma a solicitação?"
                                    onConfirm={() => { form.submit() }}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <Button type="primary" htmlType="submit">
                                        Finalizar
                                </Button>
                                </Popconfirm>
                            )}
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
