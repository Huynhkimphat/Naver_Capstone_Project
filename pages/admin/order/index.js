import React from 'react';
import Layout from "../../../components/Admin/Layout/Layout";
import Orders from '../../../components/Admin/Orders/Orders';
import Header from '../../../components/Admin/Header/Header';
const index = (props) => {
    return (
        <Layout>
            <Header direction = {'Home > Orders'}></Header>
            <Orders></Orders>
        </Layout>
    );
};

export default index;