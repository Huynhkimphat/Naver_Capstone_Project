import React from 'react';
import { getServerSideProps } from '..';
import Layout from "../../../components/Admin/Layout/Layout"
import AdHeader from '../../../components/Admin/Header/Header';
import Chat from '../../../components/Admin/Chat/Chat';
const index = () => {
    return (
        <Layout>
            <AdHeader direction="Home / Chat"></AdHeader>
            <Chat></Chat>
        </Layout>
    );
};

export default index;

export { getServerSideProps }