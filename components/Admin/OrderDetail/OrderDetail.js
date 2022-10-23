import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import _Image from '../../../static/Product1.png'
import { useDispatch, useSelector } from 'react-redux';
import updateField from '../../../services/api/admin/updateField';
import { updateStatus } from '../../../redux/actions/orderAction';
import { useRouter } from 'next/router';
import userService from '../../../services/api/userService';
import productService from '../../../services/api/admin/productService';

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
    productContainer: 'w-full flex justify-between p-4 gap-8 items-center mt-4 border-b-2 pb-4',
    productName: 'font-semibold text-xl',
    btnGroup: 'flex gap-4 justify-end mt-8',
    productItInfo: 'font-semibold',

}
const OrderDetail = () => {
    // useSelector to select state in store, it references to state.order
    const dispatch = useDispatch();
    const router = useRouter();
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const {
        code,
        customerId,
        date,
        totalPrice,
        status,
        productListDetail
    } = useSelector(state => state.rootReducer.order.data)
    useEffect(() => {
        userService.getUserByEmail(customerId).then(res => setUser(res));
        productService.getProductsByIds(productListDetail).then(res => setProducts(res))
    }, [])
    const ordersList = productListDetail?.map((order, index) => {
        return (
            <div key={order.productId}
                className={styles.productContainer}>   
                <div className='flex flex-col gap-2'>
                    <h1 className={styles.productName}>Name: {products[index]?.name}</h1>
                    <span className={styles.productItInfo}>🏷️ Category: {products[index]?.category}</span>
                   
                    <span className={styles.productItInfo}>💸 Price:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products[index]?.price)} VNĐ</span>
                    <span className={styles.productItInfo}>🧮 Qt: {order.amount} Item</span>
                   
                    <h1 className={styles.productName}>💰 Total:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)} (VNĐ via COD)</h1>
                    <span>🚚 Tracking Status on: 11:30PM, Today</span>
                </div>
                <Image className='rounded-2xl' src={products[index]?.images[0]} width={200} height={200} alt=""></Image>
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
                    <Image src={user?.imageUrl} height={60} width={60} alt=''></Image>
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
                        <h1 className={styles.customerTitle}>Ⓜ️ Customer: {user.name}</h1>
                        <span>🆔 Customer ID: {customerId}</span>
                        <span>📧 Email: {user.email}</span>
                        <span>📞 Phone: {!user.phone ? "NA" : user.phone}</span>
                        <span>🅰️ Address: {!user.address ? "NA" : user.address}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className={styles.ordersTitle}>🛍️ Orders</h1>
                        {/* Print All Order List */}
                        {ordersList}
                        {/* Total */}
                        <div className={styles.totalPrice}>
                       
                            <span className={styles.finalPrice}>Total:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)} (VNĐ)</span>
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
                            onClick={handleSubmit}>Reject 🚫</button>
                        <button
                            className={`
                            ${styles.panel} 
                            ${(status == "REJECT" || status == "APPROVED") ? styles.unableClick : styles.approved}`}
                            icon="pi pi-check"
                            value={'APPROVED'}
                            onClick={handleSubmit}>Approve ✅</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;