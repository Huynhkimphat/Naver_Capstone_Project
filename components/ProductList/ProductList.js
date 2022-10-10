import React from "react";
import Image from "next/image";
import Product1 from "../../static/Product1.png";
import Product2 from "../../static/Product2.png";
import Product3 from "../../static/Product3.png";
import Product4 from "../../static/Product4.png";
import { useState, useEffect } from "react";

const styles = {
    wrapper: "lg:p-14 md:p-12 p-6",
    title: "md:text-3xl text-xl md:mb-7 mb-4",
    container: "grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8",
    img: "hover:cursor-pointer",
    name: "mt-6 mb-2 text-lg md:text-sm lg:text-xl hover:cursor-pointer",
    price: "text-lg md:text-sm lg:text-lg hover:cursor-pointer ",
    btnContainer: "text-center",
    btnViewCollection:
        "mt-8 bg-zinc-50 py-4 px-8 w-full md:w-auto hover:text-[#FA4A0C] hover:bg-zinc-200 hover:duration-300 hover:rounded-xl",
    textColorHover: "hover:text-[#FA4A0C]",
};

const productList = [
    {
        id: 1,
        img: Product1,
        name: "The Dandy chair",
        price: "£250",
    },
    {
        id: 2,
        img: Product2,
        name: "Rustic Vase Set",
        price: "£155",
    },
    {
        id: 3,
        img: Product3,
        name: "The Silky Vase",
        price: "£125",
    },
    {
        id: 4,
        img: Product4,
        name: "The Lucy Lamp",
        price: "£399",
    },
    {
        id: 5,
        img: Product2,
        name: "Rustic Vase Set",
        price: "£155",
    },
    {
        id: 6,
        img: Product3,
        name: "The Silky Vase",
        price: "£125",
    },
    {
        id: 7,
        img: Product4,
        name: "The Lucy Lamp",
        price: "£399",
    },
    {
        id: 8,
        img: Product1,
        name: "The Dandy chair",
        price: "£250",
    },
    {
        id: 9,
        img: Product2,
        name: "Rustic Vase Set",
        price: "£155",
    },
    {
        id: 10,
        img: Product3,
        name: "The Silky Vase",
        price: "£125",
    },
    {
        id: 11,
        img: Product4,
        name: "The Lucy Lamp",
        price: "£399",
    },
    {
        id: 12,
        img: Product2,
        name: "Rustic Vase Set",
        price: "£155",
    },
    {
        id: 13,
        img: Product3,
        name: "The Silky Vase",
        price: "£125",
    },
    {
        id: 14,
        img: Product4,
        name: "The Lucy Lamp",
        price: "£399",
    },
];

let productAmount = 4;
let startIndexProduct = 0;
let endIndexProduct = startIndexProduct + productAmount;

const ProductList = () => {
    const productListUI = productList.slice(startIndexProduct, endIndexProduct);
    const [productListUIUpdate, setProductListUI] = useState(productListUI);

    const loadMore = () => {
        if (endIndexProduct + 1 <= productList.length) {
            const newProductListUIUpdate=[...productListUIUpdate,...productList.slice(endIndexProduct, endIndexProduct + productAmount)]
            endIndexProduct += productAmount;
            setProductListUI(newProductListUIUpdate);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>New ceramics</div>
            <div className={styles.container}>
                {productListUIUpdate.map((item) => (
                    <div key={item.key} className={styles.item}>
                        <Image className={styles.img} src={item.img} alt="" />
                        <div className={styles.name}>
                            <span className={styles.textColorHover}>{item.name}</span>
                        </div>
                        <div className={styles.price}>
                            <span className={styles.textColorHover}>{item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.btnContainer} onClick={loadMore}>
                <button className={styles.btnViewCollection}>View Collection</button>
            </div>
        </div>
    );
};

export default ProductList;
