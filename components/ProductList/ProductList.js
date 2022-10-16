import React from "react";
import Image from "next/image";
import Product1 from "../../static/Product1.png";
import Product2 from "../../static/Product2.png";
import Product3 from "../../static/Product3.png";
import Product4 from "../../static/Product4.png";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AppSelector from "../../redux/selector";
import { useRouter } from "next/router";
import Link from "next/link";

import Router from "next/router";
const styles = {
  wrapper: "lg:p-14 md:p-12 p-6",
  container: "grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8",
  item: "flex flex-col items-center",
  img: "hover:cursor-pointer",
  name: "mt-6 mb-2 text-lg md:text-sm lg:text-xl hover:cursor-pointer",
  price: "text-lg md:text-sm lg:text-lg hover:cursor-pointer",
  btnContainer: "text-center",
  btnViewCollection:
    "mt-8 bg-zinc-50 py-4 px-8 w-full md:w-auto hover:text-[#FA4A0C] hover:bg-zinc-200 hover:duration-300 hover:rounded-xl",
  textColorHover: "hover:text-[#FA4A0C]",
};

let productAmount = 4;
let startIndexProduct = 0;
let endIndexProduct = startIndexProduct + productAmount;

const ProductList = ({ viewCollection = false, category }) => {
  const router = useRouter();
  const productList = useSelector((state) => AppSelector.getProduct(state));

  const productListByCate = category
    ? productList.filter((product) => product.category === category)
    : productList;

  const productListUI = productListByCate.slice(
    startIndexProduct,
    endIndexProduct
  );
  const [productListUIUpdate, setProductListUI] = useState(productListUI);

  const loadMore = () => {
    if (viewCollection) {
      return router.push(`/category/${category.toLowerCase()}`);
    }
    if (endIndexProduct + 1 <= productList.length) {
      const newProductListUIUpdate = [
        ...productListUIUpdate,
        ...productList.slice(endIndexProduct, endIndexProduct + productAmount),
      ];
      endIndexProduct += productAmount;
      setProductListUI(newProductListUIUpdate);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {productListUIUpdate.map((item) => (
          <div key={item.id} className={styles.item}>
            <Image
              src={item?.images[0]}
              width={350}
              height={350}
              alt=""
              objectFit="contain"
            />
            <Link
              className={styles.textColorHover}
              href={`/product/${item.id}`}
            >
              {item.name}
            </Link>
            <div className={styles.name}></div>
            <div className={styles.price}>
              <span className={styles.textColorHover}>{item.price}</span>
            </div>
          </div>
        ))}
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
