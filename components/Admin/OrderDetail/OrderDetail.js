import React, { useEffect } from 'react';
import Image from 'next/image'
import _Image from '../../../static/Product1.png'
import { useDispatch, useSelector } from 'react-redux';
import updateField from '../../../services/api/admin/updateField';
import { updateStatus } from '../../../redux/actions/orderAction';
import { useRouter } from 'next/router';
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col mt-4 rounded-lg',
    header: 'bg-admin_color flex p-4 justify-between border-b-2 rounded-lg shadow-xl',
    headerInfo: 'flex gap-4 text-white',
    orderInfo: 'flex flex-col justify-between',
    customerContainer: 'flex flex-col p-4 justify-between w-full',
    customerField: 'flex w-full justify-start border-b-2 py-4',
    customerInfo: ' w-1/2 flex items-start flex-col gap-1',
    customerTitle: 'font-semibold text-xl',
    ordersTitle: 'text-2xl px-4 text-white rounded-lg bg-admin_color font-bold py-4 shadow-xl',
    totalPrice: 'w-full flex justify-end bg-admin_color p-4 rounded-b-lg shadow-xl',
    finalPrice: 'font-bold text-2xl text-white',
    panel: ' h-fit px-4 py-2 text-white rounded-lg font-medium shadow-xl',
    pending: "bg-yellow-500 hover:bg-yellow-600",
    approved: "bg-green-500 hover:bg-green-600",
    reject: "bg-red-500 hover:bg-red-600",
    unableClick: "pointer-events-none bg-gray-500",
    productContainer: 'w-full flex flex-col gap-2 mt-4 border-b-2 pb-4',
    productName: 'font-semibold text-xl',
    btnGroup: 'flex gap-4 justify-end mt-8',
    

}
const OrderDetail = () => {
    // useSelector to select state in store, it references to state.order
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        code,
        date,
        totalPrice,
        status,
        productListDetail
    } = useSelector(state => state.rootReducer.order.data)
    useEffect(() => {
        console.log(productListDetail);
    }, [])
    const ordersList = productListDetail.map((order, index) => {
        return (
            <div key={order.productId}
                className={styles.productContainer}>
                <h1 className={styles.productName}>Headphones Bose 35 II</h1>
                <span>Qt: {order.amount} Item</span>
                <h1 className={styles.productName}>Price: {order.total} VNĐ via (COD)</h1>
                <span>Tracking Status on: 11:30PM, Today</span>
            </div>
        )
    })
    const handleSubmit = (e) => {
        updateField.byId(code, "status", e.target.value)
        dispatch(updateStatus(e.target.value))
        router.push("/admin/order")
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <Image src={_Image} height={60} width={60} alt=''></Image>
                    <div className={styles.orderInfo}>
                        <span>Order ID: {code}</span>
                        <span>Place On {date}</span>
                    </div>
                </div>
                <span className={`${styles.panel} ${styles[status.toLowerCase()]}`}>{status}</span>
            </div>
            <div className={styles.customerContainer}>
                <div className={styles.customerField}>
                    <div className={styles.customerInfo}>
                        <h1 className={styles.customerTitle}>Customer: Nguyen Hieu</h1>
                        <span>Customer ID: 9239293</span>
                        <span>Email: hieulechanhkk@gmail.com</span>
                        <span>Phone: 0913906117</span>
                        <span>Address: HCM</span>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className={styles.ordersTitle}>Orders</h1>
                        {/* Print All Order List */}
                        {ordersList}
                        {/* Total */}
                        <div className={styles.totalPrice}>
                            <span className={styles.finalPrice}>Total: {totalPrice} VNĐ</span>
                        </div>
                    </div>
                    {/* Button */}
                    <div className={styles.btnGroup}>
                        <button
                            className={`
                                ${styles.panel} 
                                ${(status == "REJECT" || status == "APPROVED") ? styles.unableClick : styles.reject}`
                            }
                            value={"REJECT"}
                            onClick={handleSubmit}>Reject</button>
                        <button
                            className={`
                            ${styles.panel} 
                            ${(status == "REJECT" || status == "APPROVED") ? styles.unableClick : styles.approved}`}
                            icon="pi pi-check"
                            value={'APPROVED'}
                            onClick={handleSubmit}>Approve</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;