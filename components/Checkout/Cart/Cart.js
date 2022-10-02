import CartHeader from "./CartHeader";
import CartContent from "./CartContent";
import Product1 from "../../../static/Product1.png";
import Product2 from "../../../static/Product2.png";
import Product3 from "../../../static/Product3.png";
import Product4 from "../../../static/Product4.png";

import { HiArrowNarrowLeft } from "react-icons/hi";

const styles = {
  cartBorder: "flex shadow-md my-10",
  cart: "w-full bg-white px-10 py-10",
  backButton:
    "flex font-semibold text-indigo-600 text-sm mt-10 items-center gap-x-4 hover:text-[red]",
};
export default function Cart({ orderNo }) {
  const cartLists = [
    {
      id: 1,
      productName: "Chair1",
      brandName: "Brand1",
      price: 1000000,
      image: Product1,
      quantity: 1,
    },
    {
      id: 2,
      productName: "Chair2",
      brandName: "Brand2",
      price: 10000,
      image: Product2,
      quantity: 100,
    },
    {
      id: 3,
      productName: "Chair3",
      brandName: "Brand3",
      price: 100,
      image: Product3,
      quantity: 500,
    },
  ];
  return (
    <div className={styles.cartBorder}>
      <div className={styles.cart}>
        <CartHeader orderNo={orderNo} />
        <CartContent data={cartLists} orderNo={orderNo} />
        <div className={styles.backButton}>
          <HiArrowNarrowLeft />
          Continue Shopping
        </div>
      </div>
    </div>
  );
}
