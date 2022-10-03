import React from 'react';

import AdminLayout from "../../components/AdminLayout/AdminLayout";
import AdminOrders from '../../components/AdminOrders/AdminBody/AdminOrders';
import AdminHeader from '../../components/AdminOrders/AdminHeader/AdminHeader';
const index = (props) => {
    return (
        <AdminLayout>
            <AdminHeader></AdminHeader>
            {/* <AdminOrders></AdminOrders> */}
        </AdminLayout>
    );
};

export default index;