import { useSelector } from "react-redux";
import AppSelector from "../../../redux/selector";

const styles = {
  wrapper: " w-full px-8 py-10",
  title: "font-semibold text-2xl border-b pb-8",
  summaryBorder: "mt-8",
  summaryDetail: "flex font-semibold justify-between py-6 text-sm uppercase",
  checkoutBtn:
    "bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full",
};

export default function Summary({ orderNo }) {
  const cart = useSelector(AppSelector.getCart);
  console.log(cart);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Order Summary</h1>
      <div className={styles.summaryBorder}>
        <div className={styles.summaryDetail}>
          <span>Total cost</span>
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.total)}</span>
        </div>
        {orderNo || <button className={styles.checkoutBtn}>Checkout</button>}
      </div>
    </div>
  );
}
