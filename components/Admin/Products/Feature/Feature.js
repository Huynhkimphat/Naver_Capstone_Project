import Router from 'next/router';
import React from 'react';
import { IoIosAddCircle } from 'react-icons/io'
const styles = {
    feature: 'w-full flex justify-end items-center gap-4 flex-wrap',
    selectGroup: 'flex w-full items-center gap-4 sm:w-[70%]',
    select: 'px-4 py-2 rounded-md shadow-lg border w-[40%] sm: w-[30%]',
    btnAdd: 'px-4 py-2 rounded-md bg-[#5842BD] text-white flex items-center gap-2 shadow-lg select-none'
}
const Feature = (props) => {
    const handleAddProduct = () => {
      Router.push('/admin/product/new')
    }
    return (
        <div className={styles.feature}>
            <button className={styles.btnAdd} onClick={handleAddProduct}>
                <IoIosAddCircle size='20px'></IoIosAddCircle>
                <span>Add Product</span>
            </button>
        </div>
    );
};

export default Feature;