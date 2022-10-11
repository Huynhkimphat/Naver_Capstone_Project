import React from 'react';
import Header from '../../../components/Admin/Header/Header';
import Layout from '../../../components/Admin/Layout/Layout';
import Products from '../../../components/Admin/Products/Products';
import { getServerSideProps } from '..';

const index = (props) => {
    return (
        <Layout>
            <div className='p-4'>
                <Header direction={'Home / Products'}></Header>
                <Products></Products>
            </div>
        </Layout>
    );
};

export default index;

export { getServerSideProps }