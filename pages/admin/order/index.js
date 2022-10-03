import React from 'react';

import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import AdminOrders from '../../../components/AdminOrders/AdminOrders';
import AdHeader from '../../../components/AdHeader/AdHeader';
const index = (props) => {
    return (
        <AdminLayout>
            <AdHeader direction = {'Home > Orders'}></AdHeader>
            <AdminOrders></AdminOrders>
        </AdminLayout>
    );
};

export default index;