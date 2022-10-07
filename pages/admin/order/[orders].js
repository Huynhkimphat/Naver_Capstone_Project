import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Admin/Layout/Layout'
import Header from '../../../components/Admin/Header/Header'
import OrderDetail from '../../../components/Admin/OrderDetail/OrderDetail';
const OrderItem = () => {
    const router = useRouter();
    const {orders} = router.query;
    return (
        <Layout>
            <Header direction = {`Home / Order / Detail`}></Header>
            <OrderDetail></OrderDetail>
        </Layout>
    );
};

export default OrderItem;