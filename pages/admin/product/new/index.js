import React from 'react';
import Layout from '../../../../components/Admin/Layout/Layout'
import Header from '../../../../components/Admin/Header/Header'
import AddProduct from '../../../../components/Admin/AddProduct/AddProduct';
import { getServerSideProps } from '..';

const index = () => {
    return (
        <Layout>
            <Header direction={'Home / Product / Add Product'}></Header>
            <AddProduct></AddProduct>
        </Layout>
    );
};

export default index;

export { getServerSideProps }