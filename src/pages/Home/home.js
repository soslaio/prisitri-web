
import React, { useEffect, useState } from 'react';
import { message, Skeleton } from 'antd';
import { useSelector } from 'react-redux';

import PreTemplate from '../../templates/PreTemplate/preTemplate';
import OrderTable from '../../components/OrderTable/orderTable';
import { getExtendedUserOrders } from '../../services/api';


export default function () {

    return (
        <PreTemplate>
            <h1>Empresa</h1>
        </PreTemplate>
    );
}
