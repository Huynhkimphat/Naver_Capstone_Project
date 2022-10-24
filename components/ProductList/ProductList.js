import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AppSelector from "../../redux/selector";
import { useRouter } from "next/router";
import Link from "next/link";
import { Puff } from "react-loader-spinner";
import { motion } from 'framer-motion'

import Router from "next/router";
const styles = {
  wrapper: "lg:p-14 md:p-12 p-6",
  container: "grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8",
  item: "flex flex-col items-center shadow-xl rounded-lg text-center py-8 cursor-pointer",
  img: "hover:cursor-pointer",
  name: "mt-6 mb-2 text-lg md:text-sm lg:text-xl hover:cursor-pointer z-10",
  price: "text-lg md:text-sm lg:text-lg hover:cursor-pointer",
  btnContainer: "text-center",
  btnViewCollection:
    "mt-8 bg-zinc-50 py-4 px-8 w-full md:w-auto hover:text-[#FA4A0C] hover:bg-zinc-200 hover:duration-300 hover:rounded-xl",
  textColorHover: "hover:text-[#FA4A0C] bg-dark_blue rounded-lg px-3 py-2 text-white truncate whitespace-nowrap",
};

const ProductList = ({
  viewCollection = false,
  category,
  priceDescSort = 2,
  dateDescSort = 2,
  productNameSearch,
}) => {
  const router = useRouter();
  const productList = useSelector((state) => AppSelector.getProduct(state));
  const [productListByCate, setProductListByCate] = useState([]);
  const [productListByName, setProductListByName] = useState([]);
  const [isLoading, setIsLoading] = useState(category ? true : false);
  const [productListUIUpdate, setProductListUIUpdate] = useState([]);

  const productAmount = 4;
  const startIndexProduct = 0;
  const [endIndex, setEndIndex] = useState(4);

  useEffect(() => {
    setEndIndex(4);
    setIsLoading(true);
    setProductListByCate(
      category
        ? productList?.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase()
        )
        : productList
    );

    setIsLoading(false);
  }, [category, productList, router, productNameSearch]);

  useEffect(() => {
    setProductListByName(
      productNameSearch
        ? productListByCate?.filter((product) =>
          product.name.toLowerCase().includes(productNameSearch.toLowerCase())
        )
        : productListByCate
    );
  }, [productListByCate, productNameSearch]);

  useEffect(() => {
    setIsLoading(true);
    setProductListUIUpdate(
      productListByName?.slice(startIndexProduct, endIndex)
    );
    setIsLoading(false);
  }, [productListByName]);

  useEffect(() => {
    if (priceDescSort == 0) {
      const cateList = [...productListByName];
      setProductListByName(
        cateList.sort((a, b) => (Number(a.price) < Number(b.price) ? 1 : -1))
      );
    }
    if (priceDescSort == 1) {
      const cateList = [...productListByName];
      setProductListByName(
        cateList.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1))
      );
    }
  }, [priceDescSort]);

  useEffect(() => {
    if (dateDescSort == 0) {
      const cateList = [...productListByName];
      setProductListByName(
        cateList.sort((a, b) => (Number(a.createdOn) > Number(b.createdOn) ? 1 : -1))
      );
    }
    console.log(dateDescSort);
    if (dateDescSort == 1) {
      const cateList = [...productListByName];
      setProductListByName(
        cateList.sort((a, b) => (Number(a.createdOn) > Number(b.createdOn) ? 1 : -1))
      );
    }
  }, [dateDescSort]);

  const loadMore = () => {
    if (viewCollection) {
      return router.push(`/category/${category.toLowerCase()}`);
    }
    if (endIndex + 1 <= productList.length) {
      const newProductListUIUpdate = [
        ...productListUIUpdate,
        ...productListByName.slice(endIndex, endIndex + productAmount),
      ];
      setEndIndex(endIndex + productAmount);
      setProductListUIUpdate(newProductListUIUpdate);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isLoading ? (
          <Puff
            height="80"
            width="80"
            radisu={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          productListUIUpdate?.map((item) => (
            <motion.div
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              key={item.id}
              onClick={() => router.push(`/product/${item.id}`)}
              className={styles.item}>
              <Image
                src={item?.images[0]}
                width={350}
                height={350}
                alt=""
                objectFit="contain"
                onClick={() => router.push(`/product/${item.id}`)}
              />
              <Link
                className={styles.textColorHover}
                href={`/product/${item.id}`}
              >
                {item.name}
              </Link>
              <div className={styles.name}></div>
              <div className={styles.price}>
                <span className={styles.textColorHover}>
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <div className={styles.btnContainer} onClick={loadMore}>
        <button className={styles.btnViewCollection}>
          {viewCollection ? `View Collection` : `Load More`}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
