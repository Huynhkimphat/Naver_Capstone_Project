import React from 'react';
import Image from 'next/image';
import { FiUser } from "react-icons/fi";
import { BsBag, BsPrinter, BsCart } from "react-icons/bs";
import Product1 from '../../../../static/Product1.png'
const styles = {
    overView: "w-full p-4 shadow-lg sm:w-[65%] overflow-hidden sm:h-73",
    ovHeader: "flex justify-evenly flex-wrap gap-3",
    ovHitem:
        " w-[45%] bg-[#EEEEEE] px-2 py-2 rounded-md flex flex-col items-center justify-center gap-1 sm:flex-row sm:w-[20%]",
    topProduct: "p-4",
    titleTopPD: "font-medium py-2",
    productList:
        "w-[100%] flex flex-col gap-1 items-center overflow-scroll h-[8rem] text-[8px] overflow-x-hidden lg:text-sm sm:h-36]",
    productItem:
        "flex w-[98%] justify-between px-2 py-4 mb-1 bg-[#EEEEEE] rounded-md",
    productLeft: "flex gap-4 w-[30%]",
    productQuantity: "flex flex-col w-[80%]",
    productRight: "flex w-[60%] justify-around",
    productRightItem: "flex flex-col items-center",
}


const listTopProduct = [1, 2, 3];
const printTopProduct = () => {
    return listTopProduct.map((element, index) => {
        return (
            <div key={Math.random()} className={styles.productItem}>
                <div className={styles.productLeft}>
                    <Image height="50px" width="50px" src={Product1} alt={""} />
                    <div className={styles.productQuantity}>
                        <span>Chair</span>
                        <span>50 orders</span>
                    </div>
                </div>
                <div className={styles.productRight}>
                    <div className={styles.productRightItem}>
                        <span>Inventory</span>
                        <span>700</span>
                    </div>
                    <div className={styles.productRightItem}>
                        <span>Sale</span>
                        <span>$1,000</span>
                    </div>
                    <div className={styles.productRightItem}>
                        <span>Prices</span>
                        <span>$1,300</span>
                    </div>
                    <div className={styles.productRightItem}>
                        <span>Today</span>
                        <span>$17,800</span>
                    </div>
                </div>
            </div>
        );
    });
};
const Overview = (props) => {
    return (
        <div className={styles.overView}>
            <div className={styles.ovHeader}>
                <div className={styles.ovHitem}>
                    <FiUser size="2.0rem" color="#FFB402"></FiUser>
                    <div className=" text-[12px]">
                        <div>Total Visits</div>
                        <div className="text-center">10.8m</div>
                    </div>
                </div>
                <div className={styles.ovHitem}>
                    <BsCart size="2.0rem" color="#5F27CD"></BsCart>
                    <div className=" text-[12px]">
                        <div>Total Sales</div>
                        <div className="text-center">10.8m</div>
                    </div>
                </div>
                <div className={styles.ovHitem}>
                    <BsBag size="2.0rem" color="#FF9F43"></BsBag>
                    <div className=" text-[12px]">
                        <div>Total Made</div>
                        <div className="text-center">10.8m</div>
                    </div>
                </div>
                <div className={styles.ovHitem}>
                    <BsPrinter size="2.0rem" color="#FF6B6B"></BsPrinter>
                    <div className=" text-[12px]">
                        <div>Completed</div>
                        <div className="text-center">10.8m</div>
                    </div>
                </div>
            </div>
            <div className={styles.topProduct}>
                <h2 className={styles.titleTopPD}>Top Products</h2>
                <div className={styles.productList}>{printTopProduct()}</div>
            </div>
        </div>
    );
};

export default Overview;