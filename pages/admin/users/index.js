import React from 'react';
import Layout from '../../../components/Admin/Layout/Layout'
import Header from '../../../components/Admin/Header/Header'
import Users from '../../../components/Admin/Users/Users';
import { getServerSideProps } from '..';
const index = (props) => {
    return (
        <Layout>
            <Header direction="Home / User"></Header>
            <Users></Users>
        </Layout>
    );
};

export default index;

export { getServerSideProps }