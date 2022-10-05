import React from 'react';
import Image from 'next/image';
import { BiSave } from 'react-icons/bi'
import Product1 from '../../../static/Product1.png'
const styles = { 
    content: 'flex justify-between items-center ',
    illustration: 'flex gap-4',
    info: 'flex flex-col justify-between',
    title: 'font-semibold text-xl',
    id: 'text-gray-500 font-thin',
    btnSave: 'px-4 py-2 rounded-md bg-[#5842BD] h-10 text-white font-semibold flex items-center gap-2 shadow-lg select-none'
}
const ProductDetailHeader = (props) => {
    return (
        <div className={styles.content}>
            <div className={styles.illustration}>
                <Image src={Product1} width={70} height={70} alt='' />
                <div className={styles.info}>
                    <h2 className={styles.title}>Chair</h2>
                    <span className={styles.id}>Code: #{props.id}</span>
                </div>
            </div>
            <button className={styles.btnSave}>
                <BiSave />
                <span>Save</span>
            </button>
        </div>
    );
};

export default ProductDetailHeader;