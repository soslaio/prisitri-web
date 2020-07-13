
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Row, Col, List, Form, Input, Space, Steps, Skeleton,
    Button, Divider, message, Calendar, Popconfirm
} from 'antd';

import ScheduleTypesList from '../../components/ScheduleTypesList/scheduleTypesList';
import { formatLocaleTime, formatLocaleDateTime } from '../../util';
import {
    getResourceDetails,
    getAvailableSchedules,
    postOrderWithSchedules,
    getResourceTypeDetails
} from '../../services/api';

import './order.scss';
import ptBrLocale from '../../locale.json';

const { Step } = Steps;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


export default function () {
    const [form] = Form.useForm();

    // redux
    const user = useSelector(state => state.user);

    // list states
    const [scheduleTypes, setScheduleTypes] = useState([]);
    const [resources, setResources] = useState([]);
    const [avaiableShedules, setAvaiableShedules] = useState([]);

    // object states
    const [resourceType, setResourceType] = useState(null);
    const [resource, setResource] = useState(null);
    const [scheduleType, setScheduleType] = useState(null);
    const [schedule, setSchedule] = useState(null);

    // ui states
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

    // ui methods
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const clearForm = () => {
        setResourceType(null);
        setResource(null);
        setScheduleType(null);
        setSchedule(null);
        setCurrentStep(0);
        form.resetFields();
    };

    const dateSelect = value => {
        clearForm();
        setSelectedDate(value.format('YYYY-MM-DD'));
    };

    const resourceTypeClick = resourceType => {
        setResourceType(resourceType);
        setLoading(true);
        getResourceTypeDetails(resourceType.id)
            .then(data => setResources(data.resources))
            .then(() => setLoading(false))
            .catch(() => message.error('Não foi possível consultar detalhes do tipo de recurso'));
        nextStep();
    }

    const resourceClick = resource => {
        setResource(resource);
        setLoading(true);
        getResourceDetails(resource.id)
            .then(data => setScheduleTypes(data.schedule_types))
            .then(() => setLoading(false))
            .catch(() => message.error('Não foi possível consultar detalhes do recurso'));
        nextStep();
    }

    const scheduleTypeClick = scheduleType => {
        setScheduleType(scheduleType);
        setLoading(true);
        getAvailableSchedules(resource.id, scheduleType.id, selectedDate)
            .then(data => setAvaiableShedules(data))
            .then(() => setLoading(false))
            .catch(() => message.error('Não foi possível consultar a lista de horários disponíveis'));
        nextStep();
    };

    const scheduleClick = schedule => {
        setSchedule(schedule);
        nextStep();
    };

    const onFinish = values => {
        const scheduleData = {
            start: schedule.start,
            end: schedule.end,
            status: 'pendente'
        };
        const data = {
            resource: resource.id,
            requester: user.extended_user.id,
            notes: values.notes,
            schedules: [scheduleData]
        };
        setLoading(true);

        postOrderWithSchedules(data)
            .then(() => setLoading(false))
            .then(() => {
                clearForm();
                message.success('Solicitação inserida com sucesso');
            })
            .catch(() => message.error('Não foi possível criar sua solicitação'));
    };

    // const defaultDate = moment('2020-06-14');

    // const [value, setValue] = useState(defaultDate);
    // const [avaiableDates, setAvaiableDates] = useState(['2020-06-17', '2020-06-24', '2020-06-30']);

    // const disableDate = (currentDate) => {
    //     const fCurrentDate = currentDate.format('YYYY-MM-DD');
    //     return !avaiableDates.includes(fCurrentDate);
    // };

    const translateTime = (time, unit) => {
        return `${time} ${ptBrLocale.lang[unit]}`.toLowerCase();
    }


    const steps = [
        {
            title: 'Tipo de Recurso',
            content: <div>
                <Divider orientation="left">
                    Tipo de Recurso/Profissional
                </Divider>
                <ScheduleTypesList onClickHandler={resourceTypeClick} />
            </div>,
        },
        {
            title: 'Recurso/Profissional',
            content: <div>
                <Divider orientation="left">
                    {resourceType?.nature === 'human' && <span>Profissional</span>}
                    {resourceType?.nature === 'material' && <span>Recurso</span>}
                </Divider>
                <Skeleton loading={loading} active>
                    <List
                        size="small"
                        bordered
                        dataSource={resources}
                        renderItem={item => <List.Item>
                            <Button type="link" block onClick={() => resourceClick(item)}>
                                {item.name}
                            </Button>
                        </List.Item>}
                    />
                </Skeleton>
            </div>,
        },
        {
            title: 'Tipo de Agenda',
            content: <div>
                <Divider orientation="left">Tipos de agenda para "{resource?.name}"</Divider>
                <Skeleton loading={loading} active>
                    <List
                        size="small"
                        bordered
                        dataSource={scheduleTypes}
                        renderItem={item => <List.Item>
                            <Button type="link" block onClick={() => scheduleTypeClick(item)}>
                                {item.name} ({translateTime(item.time, item.unit)})
                        </Button>
                        </List.Item>}
                    />
                </Skeleton>
            </div>,
        },
        {
            title: 'Horário',
            content: <div>
                <Divider orientation="left">Horários disponíveis</Divider>
                <Skeleton loading={loading} active>
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
                </Skeleton>
            </div>,
        },
        {
            title: 'Resumo',
            content: <div>
                <Divider orientation="left">Resumo da solicitação</Divider>
                <Form.Item label="Recurso">
                    <div>{resource?.name} ({resourceType?.name})</div>
                </Form.Item>
                <Form.Item label="Tipo">
                    <div>{scheduleType?.name} ({scheduleType?.time} {scheduleType?.unit})</div>
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

    return (
        <div id="order">
            <h1>Solicitar utilização de recurso</h1>
            <Row>
                <Col md={8}>
                    <div className="site-calendar">
                        <Calendar
                            fullscreen={false}
                            onSelect={dateSelect}
                        // value={value}
                        // disabledDate={disableDate}
                        />
                    </div>
                </Col>
                <Col md={16}>
                    <Form {...layout} onFinish={onFinish} form={form}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Steps current={currentStep} size="small">
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
                                    >
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Finalizar
                                </Button>
                                    </Popconfirm>
                                )}
                            </div>
                        </Space>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
