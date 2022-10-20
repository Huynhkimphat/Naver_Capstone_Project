import CartHeader from "./CartHeader";
import CartContent from "./CartContent";
import Product1 from "../../../static/Product1.png";
import Product2 from "../../../static/Product2.png";
import Product3 from "../../../static/Product3.png";
import Product4 from "../../../static/Product4.png";
import { useSelector } from "react-redux";
import AppSelector from "../../../redux/selector";
import cartService from "../../../services/api/cartService";
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method

import { HiArrowNarrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import orderService from "../../../services/api/admin/orderService";

const styles = {
  cartBorder: "flex shadow-md my-10",
  cart: "w-full bg-white px-10 py-10",
  backButton:
    "flex font-semibold text-indigo-600 text-sm mt-10 items-center gap-x-4 hover:text-[red]",
};
export default function Cart({ orderNo }) {
  const router = useRouter();

  const cart = useSelector((state) => AppSelector.getCart(state));

  const [order, setOrder] = useState(null);

  // useEffect
  useEffect(() => {
    orderNo && orderService.getOrderById(orderNo).then((res) => setOrder(res));
  }, []);

  const product = useSelector((state) => AppSelector.getProduct(state));

  const [productCartUI, setProductCartUI] = useState([]);

  const updateCartOrNot = () => {
    if (!orderNo) {
      cartService.updateCart(cart.id, cart);
    }
    return router.push("/");
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Go to home page and update your cart?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => updateCartOrNot(),
      reject: () => console.log("Hi"),
    });
  };

  const setUpProductCartUI = (product, cartList) => {
    return cartList.map((item) => {
      const itemDetail = product.filter((pro) => pro.id === item.productId);
      return {
        ...item,
        productName: itemDetail[0]?.name,
        price: itemDetail[0]?.price,
        image: itemDetail[0]?.images[0],
        brandName: itemDetail[0]?.configuration?.brand,
        quantity: itemDetail[0]?.quantity,
      };
    });
  };

  useEffect(() => {
    if (order) {
      return setProductCartUI(
        setUpProductCartUI(product, order.productListDetail)
      );
    }
    !orderNo &&
      setProductCartUI(setUpProductCartUI(product, cart.productListDetail));
  }, [cart.productListDetail, product, order, orderNo]);

  return (
    <div className={styles.cartBorder}>
      <div className={styles.cart}>
        <CartHeader orderNo={orderNo} />
        <CartContent cart={productCartUI} orderNo={orderNo} />
        <div className={styles.backButton} label="Confirm" onClick={confirm1}>
          <HiArrowNarrowLeft />
          Continue Shopping
        </div>
      </div>
    </div>
  );
}
