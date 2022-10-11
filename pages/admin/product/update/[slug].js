import React from 'react';
import { useRouter } from "next/router";

import Layout from '../../../../components/Admin/Layout/Layout'
import Header from '../../../../components/Admin/Header/Header'
import ProductItem from '../../../../components/Admin/ProductDetail/ProductDetail';
import { getServerSideProps } from '..';

const ProductDetail = () => {
    const router = useRouter();
    const { slug } = router.query;
    return (
        <Layout>
            <Header direction={slug}></Header>
            <ProductItem id={slug}></ProductItem>
        </Layout>
    );
};

export default ProductDetail;

export { getServerSideProps }