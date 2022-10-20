import CartHeader from "./CartHeader";
import CartContent from "./CartContent";
import Product1 from "../../../static/Product1.png";
import Product2 from "../../../static/Product2.png";
import Product3 from "../../../static/Product3.png";
import Product4 from "../../../static/Product4.png";
import { useSelector } from "react-redux";
import AppSelector from "../../../redux/selector";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";

const styles = {
  cartBorder: "flex shadow-md my-10",
  cart: "w-full bg-white px-10 py-10",
  backButton:
    "flex font-semibold text-indigo-600 text-sm mt-10 items-center gap-x-4 hover:text-[red]",
};
export default function Cart({ orderNo }) {

  const {productListDetail} = useSelector(state=> AppSelector.getCart(state))

  const product = useSelector(state => AppSelector.getProduct(state));

  const [productCartUI,setProductCartUI]= useState(productListDetail);

  const setUpProductCartUI = (product,cartList)=>{
    return cartList.map(item=> {
      const itemDetail = product.filter(pro => pro.id===item.productId);
      return {
        ...item,
        productName: itemDetail[0]?.name,
        price:itemDetail[0]?.price,
        image: itemDetail[0]?.images[0],
        brandName: itemDetail[0]?.configuration?.brand,
        quantity: itemDetail[0]?.quantity,
      }
    })
  }

  useEffect(()=>{
    setProductCartUI(setUpProductCartUI(product,productListDetail));
  },[productListDetail,product])

  return (
    <div className={styles.cartBorder}>
      <div className={styles.cart}>
        <CartHeader orderNo={orderNo} />
        <CartContent cart={productCartUI} orderNo={orderNo} />
        <div className={styles.backButton}>
          <HiArrowNarrowLeft />
          Continue Shopping
        </div>
      </div>
    </div>
  );
}
