
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import OrdersTable from '../../components/OrdersTable/ordersTable';
import { getExtendedUserOrders } from '../../services/api';


export default function () {

    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getExtendedUserOrders(user.extended_user.id)
                .then(data => setOrders(data))
                .catch(() => message.error('Não foi possível carregar a lista de solicitações'))
                .finally(() => setLoading(false));
        }
    }, [user]);

    return (
        <React.Fragment>
            <h1>Minhas solicitações</h1>
            <OrdersTable orders={orders} loading={loading} />
        </React.Fragment>
    );
}
