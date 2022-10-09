import React, { useEffect } from 'react';
import Image from 'next/image'
import _Image from '../../../static/Product1.png'
import { useSelector } from 'react-redux';
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col mt-4 rounded-md',
}
const OrderDetail = () => {
    // Just A test
    const {products, status} = useSelector((state) => state.rootReducer.product)
    useEffect(() => {
        console.log(products)
    }, [])
    return (
        <div className={styles.wrapper}>
            <div className='flex p-4 gap-4 border-b-2'>
                <Image src={_Image} height={60} width={60} alt=''></Image>
                <div className='flex flex-col justify-between'>
                    <span>Order ID: 1222528743</span>
                    <span>Place On 12, March 2019</span>
                </div>
            </div>
            <div className='flex flex-col p-4 justify-between w-full'>
                <div className='flex w-full justify-between border-b-2 py-4'>
                    <div className=' w-1/2 flex flex-col gap-2'>
                        <h1 className='font-semibold text-xl'>Headphones Bose 35 II</h1>
                        <span>Qt: 1 Item</span>
                        <h1 className='font-semibold text-xl'>$ 299 via (COD)</h1>
                        <span>Tracking Status on: 11:30PM, Today</span>
                    </div>
                    <div className=' w-1/2 flex flex-col gap-1'>
                        <h1 className='font-semibold text-xl'>Customer: Nguyen Hieu</h1>
                        <span>Customer ID: 9239293</span>
                        <span>Email: hieulechanhkk@gmail.com</span>
                        <span>Phone: 0913906117</span>
                        <span>Address: HCM</span>
                        <span>{status}</span>
                    </div>
                </div>
                <div></div>
                <div className='flex gap-4 mt-4'>
                    <button className='px-4 py-2 rounded-md bg-[#5842BD] h-10 text-white font-semibold flex items-center gap-2 shadow-lg select-none w-fit'>Reject</button>
                    <button className='px-4 py-2 rounded-md bg-[#5842BD] h-10 text-white font-semibold flex items-center gap-2 shadow-lg select-none w-fit'>Approve</button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;