import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Product from '../../../static/Product1.png'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { InputText } from 'primereact/inputtext';
import orderService from '../../../services/api/admin/orderService';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { chooseOrder } from '../../../redux/actions/orderAction';

const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col shadow-lg rounded-md',
    header: 'w-full flex items-center justify-between bg-admin_color p-4 rounded-md',
    headerInfo: 'flex flex-col gap-4 text-white',
    headerTitle:
        'font-semibold text-2xl text-xl bg-white text-admin_color w-fit px-3 py-2 rounded-md',
    headerName: 'font-semibold text-xl',
    headerContact: 'flex flex-col gap-2',
    invoice: 'p-4 flex flex-col gap-2',
    invoiceHeader: 'flex justify-between',
    invoiceTitle: 'bg-admin_color px-3 py-2 w-fit text-xl text-white rounded-md',
    invoiceSearch: "p-input-icon-right",
    invoiceSrchIcon: "pi pi-search",
    ordersContainer:
        'border-t-2 border-admin_color pt-8 flex flex-col gap-4 max-h-96 overflow-y-scroll',
    totalContainer: 'w-full rounded-md flex justify-end p-4 border-t-4 px-4',
    total: 'px-4 font-semibold text-xl',
    orderContainer: "flex justify-between p-4 bg-[#EEEEEE] rounded-md flex-wrap items-start",
    codeCol: 'flex flex-col items-center w-[30%]',
    commonCol: 'flex flex-col items-center w-[15%] text-center',
    buttonDetail: 'bg-admin_color px-2 py-1 rounded-md text-white my-auto font-semibold w-[15%]'
}
const Invoice = () => {
    const router = useRouter();
    const { selectedUser } = useSelector(state => state.rootReducer.user)
    const [orderFiltered, setOrderFiltered] = useState([]);
    const [orders, setOrders] = useState([]);
    const [inputSearch, setInputSearch] = useState('')
    const [total, setTotal] = useState(null)
    const dispatch = useDispatch();
    const handleClickDetail = (id) => {
        const filterRow = orderFiltered.filter((item) => {
            return item.id === id
        })
        const order = filterRow[0];
        dispatch(chooseOrder({
            ...order,
            code: order.id,
            date: order.orderDate,
        }))
        router.push(`/admin/order/${id}`)
    }
    const printOrdersList = orderFiltered.map((item, index) => {
        console.log(item);
        return (
            <div key={item?.id} className={styles.orderContainer}>
                <div className={styles.codeCol}>
                    <span>Code</span>
                    <span>{item?.id}</span>
                </div>
                <div className={styles.commonCol}>
                    <span>Date</span>
                    <span>{item?.orderDate}</span>
                </div>
                <div className={styles.commonCol}>
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.totalPrice)}</span>
                </div>
                <div className={styles.commonCol}>
                    <span>Status</span>
                    <span>{item?.status}</span>
                </div>
                <button
                    className={styles.buttonDetail}
                    onClick={() => handleClickDetail(item?.id)}
                >Detail</button>
            </div>
        )
    })
    const handleInputChange = (e) => {
        setInputSearch(e.target.value)
        if (!e.target.value)
            setOrderFiltered(orders)
        else {
            const fil = orders.filter((item) => {
                return item.id.includes(e.target.value)
            })
            setOrderFiltered(fil)
        }
    }
    useEffect(() => {
        orderService.getOrdersById(selectedUser.email).then(res => {
            // const orderExcuted = res.map((ord) => {
            //     return {
            //         ...ord,
            //   }
            // })
            setOrders(res)
            setOrderFiltered(res)
        })
    }, [selectedUser])
    useEffect(() => {
        const calculateTotal = orderFiltered.reduce((prev, cur) => {
            return prev + cur.totalPrice;
        }, 0)
        setTotal(calculateTotal)
    }, [orderFiltered])
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.headerTitle}>Customer Information</h1>
                    <h1 className={styles.headerName}>Name: {selectedUser?.name}</h1>
                    <div className={styles.headerContact}>
                        <span>ID: {selectedUser?.email}</span>
                        <span>Email: {selectedUser?.email}</span>
                        <span>Phone: {selectedUser?.phone}</span>
                        <span>Address: {selectedUser?.address}</span>
                    </div>
                </div>
                <div className='rounded-md px-10'>
                    <Image className='rounded-md' src={selectedUser?.imageUrl} alt='' width={150} height={150} />
                </div>
            </div>
            <div className={styles.invoice}>
                <div className={styles.invoiceHeader}>
                    <h1 className={styles.invoiceTitle}>Invoice</h1>
                    <span className={styles.invoiceSearch}>
                        <InputText
                            value={inputSearch}
                            onChange={handleInputChange}
                            placeholder="Search by code" />
                        <i className={styles.invoiceSrchIcon} />
                    </span>
                </div>
                <div className={styles.ordersContainer}>
                    {printOrdersList}
                </div>
            </div>
            <div className={styles.totalContainer}>
                <h1 className={styles.total}>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)} (VNĐ) 💰</h1>
            </div>
        </div>);
};

export default Invoice;
