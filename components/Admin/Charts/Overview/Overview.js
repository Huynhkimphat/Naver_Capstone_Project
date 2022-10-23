import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiUser } from "react-icons/fi";
import { BsBag, BsPrinter, BsCart } from "react-icons/bs";
import { useSelector } from 'react-redux';
import userService from '../../../../services/api/admin/userService';
import productService from '../../../../services/api/admin/productService';
import categoryService from '../../../../services/api/admin/categoryService'
import Scroll from '../../Animation/Scroll';
const styles = {
    overView: "w-full p-4 shadow-lg sm:w-[65%] overflow-hidden sm:h-73",
    ovHeader: "flex justify-evenly flex-wrap gap-3",
    ovHitem:
        " w-[45%] bg-[#EEEEEE] px-2 py-2 rounded-md flex flex-col items-center justify-center gap-1 sm:flex-row sm:w-[20%]",
    topProduct: "pt-4",
    titleTopPD: "font-medium py-2",
    productList:
        "w-full flex flex-col gap-1 items-center text-[8px] overflow-x-hidden lg:text-sm sm:h-36]",
    productItem:
        "flex w-[98%] justify-between px-2 py-4 mb-1 bg-[#EEEEEE] rounded-md",
    productLeft: "flex gap-4 w-[30%]",
    productQuantity: "flex flex-col w-[80%]",
    productRight: "flex w-[60%] justify-around",
    productRightItem: "flex flex-col items-center",
}


// const listTopProduct = [1, 2, 3];
const Overview = (props) => {
    const orders = useSelector(state => state.rootReducer.order.orderList)
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [listTopProduct, setlistTopProduct] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const topList = () => {
        let arr = [];
        orders.forEach((order) => {
            order.productListDetail.forEach((detail) => {
                arr = [...arr, detail]
            })
        })
        return arr;
    }
    const rs = topList().map((item, index, arr) => {
        const rd = arr.reduce((pre, cur) => {
            if (cur.productId === item.productId)
                return {
                    total: pre.total + cur.total,
                    amount: pre.amount + cur.amount
                }
            return pre;
        }, { total: 0, amount: 0 })
        return {
            productId: item.productId,
            ...rd
        }
    })
    const removeDup = (arr) => {
        let result = [];
        arr.forEach((item) => {
            const check = result.find(o => o.productId === item.productId) ? true : false;
            if (!check)
                result.push(item)
        })
        return result;
    }
    const getTopList = (number) => {
        return removeDup(rs).sort((a, b) => a.amount - b.amount).reverse().slice(0, number + 1)
    }
    useEffect(() => {
        userService.getAllUsers().then(res => setUsers([...users, ...res]));
        productService.getListProduct().then(res => setProducts(res));
        categoryService.getCategories().then(res => setCategories(res))
    }, [])
    useEffect(() => {
        const topProduct = getTopList(3);
        setTopProducts(topProduct)
        productService.getProductsByIds(topProduct).then(res => setlistTopProduct(res))
    }, [orders])
    const printTopProduct = () => {
        return listTopProduct.map((product, index) => {
            return (
                <div key={index} className={styles.productItem}>
                    <div className={styles.productLeft}>
                        <Image height="50px" width="50px" src={product?.images ? product?.images[0] : undefined} alt={""} />
                        <div className={styles.productQuantity}>
                            <span>{product?.name}</span>
                            <span>{topProducts[index]?.amount} sold</span>
                        </div>
                    </div>
                    <div className={styles.productRight}>
                        <div className={styles.productRightItem}>
                            <span>Inventory</span>
                            <span>{product?.quantity}</span>
                        </div>
                        <div className={styles.productRightItem}>
                            <span>Sale</span>
                            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topProducts[index]?.total)}</span>
                        </div>
                        <div className={styles.productRightItem}>
                            <span>Prices</span>
                            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</span>
                        </div>
                        <div className={styles.productRightItem}>
                            <span>Best Seller</span>
                            <span>{index + 1}</span>
                        </div>
                    </div>
                </div>
            );
        });
    };
    return (
        <Scroll style={styles.overView}>
            <div className={styles.ovHeader}>
                <div className={styles.ovHitem}>
                    <FiUser size="2.0rem" color="#FFB402"></FiUser>
                    <div className=" text-[12px]">
                        <div>Total User</div>
                        <div className="text-center">{users.length}</div>
                    </div>
                </div>
                <div className={styles.ovHitem}>
                    <BsCart size="2.0rem" color="#5F27CD"></BsCart>
                    <div className=" text-[12px]">
                        <div>Products</div>
                        <div className="text-center">{products.length}</div>
                    </div>
                </div>
                <div className={styles.ovHitem}>
                    <BsBag size="2.0rem" color="#FF9F43"></BsBag>
                    <div className=" text-[12px]">
                        <div>Category</div>
                        <div className="text-center">{categories.length}</div>
                    </div>
                </div>
                <div className={styles.ovHitem}>
                    <BsPrinter size="2.0rem" color="#FF6B6B"></BsPrinter>
                    <div className=" text-[12px]">
                        <div>Orders</div>
                        <div className="text-center">{orders.length}</div>
                    </div>
                </div>
            </div>
            <div className={styles.topProduct}>
                <h2 className={styles.titleTopPD}>Top Products</h2>
                <div className={styles.productList}>{printTopProduct()}</div>
            </div>
        </Scroll>
    );
};

export default Overview;