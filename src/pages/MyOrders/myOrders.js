
import React, { useEffect, useState } from 'react';
import { message, Skeleton } from 'antd';
import { useSelector } from 'react-redux';

import CompanyTemplate from '../../templates/CompanyTemplate/companyTemplate';
import OrderTable from '../../components/OrderTable/orderTable';
import { getExtendedUserOrders } from '../../services/api';


export default function () {

    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getExtendedUserOrders(user.extended_user.id)
                .then(data => setOrders(data))
                .catch(() => message.error('Não foi possível carregar a lista de solicitações'))
                .finally(() => setLoading(false));
        }
    }, [user]);

    return (
        <CompanyTemplate>
            <h1>Minhas solicitações</h1>
            <div className="resource-types-list">
                <Skeleton loading={loading} active>
                    <OrderTable dataSource={orders} />
                </Skeleton>
            </div>
        </CompanyTemplate>
    );
}