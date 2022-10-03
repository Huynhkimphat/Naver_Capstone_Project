import React from 'react';
import AdHeader from '../../../components/AdHeader/AdHeader';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import AdProducts from '../../../components/AdProducts/AdProducts';

const index = (props) => {
    return (
        <AdminLayout>
            <div className='p-4'>
                <AdHeader direction={'Home > Products'}></AdHeader>
                <AdProducts></AdProducts>
            </div>
        </AdminLayout>
    );
};

export default index;