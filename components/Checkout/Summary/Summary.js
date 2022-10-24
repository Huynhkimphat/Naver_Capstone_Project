import { useDispatch, useSelector } from "react-redux";
import AppSelector from "../../../redux/selector";
import orderService from "../../../services/api/admin/orderService";
import cartService from "../../../services/api/cartService";
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { setCart } from "../../../redux/actions/cartAction";
import { motion } from 'framer-motion'
const styles = {
  wrapper: " w-full px-8 py-10",
  title: "font-semibold text-2xl border-b pb-8",
  summaryBorder: "mt-8",
  summaryDetail: "flex font-semibold justify-between py-6 text-sm uppercase",
  checkoutBtn:
    "bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-2xl",
};

export default function Summary({ orderNo }) {
  const cart = useSelector(AppSelector.getCart);
  const dispatch = useDispatch();
  console.log(cart);

  const handleCheckout = () => {
    const prepareingData = {
      customerId: cart.customerId,
      productListDetail: cart.productListDetail,
      status: "PENDING",
      totalPrice: cart.total,
    };
    orderService.createOrder(prepareingData);

    cartService.updateCart(cart.id, {
      ...cart,
      productListDetail: [],
      total: 0,
    });
    cartService
      .getCartByEmail(cart.customerId)
      .then((res) => dispatch(setCart(res)));
  };

  const confirm = () => {
    confirmDialog({
      message: "Wanna to checkout?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => !orderNo && handleCheckout(),
      reject: () => rejectFunc(),
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Order Summary</h1>
      <div className={styles.summaryBorder}>
        <div className={styles.summaryDetail}>
          <span>Total cost</span>
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(cart.total)}
          </span>
        </div>
        {orderNo || (
            <button className={styles.checkoutBtn} onClick={confirm}>
              Checkout
            </button>
        )}
      </div>
    </div>
  );
}
