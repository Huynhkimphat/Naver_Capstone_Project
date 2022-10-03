import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io'
import DataTable from 'react-data-table-component';
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    feature: 'w-[100%] flex justify-between items-center gap-4 flex-wrap',
    selectGroup: 'flex w-[100%] items-center gap-4 sm:w-[70%]',
    select: 'px-4 py-2 rounded-md shadow-lg border w-[40%] sm: w-[30%]',
    btnAdd: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg select-none'
}

const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        reorder: true
    },
    {
        name: 'Product',
        selector: (row) => row.product,
        sortable: true,
        reorder: true
    },
    {
        name: 'Category',
        selector: (row) => row.category,
        sortable: true,
        reorder: true
    },

    {
        name: 'Price',
        selector: (row) => row.price,
        sortable: true,
        reorder: true
    },

    {
        name: 'Stock Left',
        selector: (row) => row.stock,
        sortable: true,
        reorder: true
    },
    {
        name: 'Status',
        selector: (row) => row.status,
    },
    {
        name: '',
        selector: (row) => row.action,
    },
];
const data = [
    {
        id: 1,
        product: 'Gray Sofa',
        category: 'Decor items',
        price: '$137.00',
        stock: '20',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-[50%]'></div>
                    <span>In Stock</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
    {
        id: 2,
        product: 'Terrible Chair',
        category: 'Chair',
        price: '$20.00',
        stock: '0',
        status: <div className='w-full flex justify-around items-center gap-2'>
                    <div className='w-2 h-2 bg-red-500 rounded-[50%]'></div>
                    <span>Out of Stock</span>
                </div>,
        action: <div className='w-full flex justify-around item-center gap-2'>
                    <BiEditAlt className='cursor-pointer'></BiEditAlt>
                    <AiOutlineDelete className='cursor-pointer'></AiOutlineDelete>
                </div>
    },
];

const AdProducts = (props) => {

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.feature}>
                <div className={styles.selectGroup}>
                    <select className={styles.select} title='Category'>
                        <option>Category</option>
                        <option>All</option>
                        <option>Chair</option>
                        <option>Table</option>
                        <option>Decor Items</option>
                        <option>Brand</option>
                    </select>
                    <select className={styles.select}>
                        <option>Status</option>
                        <option>All</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
                <button className={styles.btnAdd}>
                    <IoIosAddCircle size='20px'></IoIosAddCircle>
                    <span>Add Product</span>
                </button>
            </div>
            <div>
                {hasWindow && <DataTable
                    columns={columns}
                    data={data}
                    responsive
                    pagination
                    selectableRows
                />}
            </div>
        </div>
    );
};

export default AdProducts;