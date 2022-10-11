import React from 'react';
import Layout from '../../../components/Admin/Layout/Layout'
import Header from '../../../components/Admin/Header/Header'
import Invoice from '../../../components/Admin/Invoice/Invoice';
import { getServerSideProps } from '..';

const UserDetail = () => {
    return (
        <Layout>
            <Header direction={'Home / User / Detail'}></Header>
            <Invoice></Invoice>
        </Layout>
    );
};

export default UserDetail;

export { getServerSideProps }