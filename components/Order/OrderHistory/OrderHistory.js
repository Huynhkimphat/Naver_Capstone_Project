import OrderHistoryHeader from "./OrderHistoryHeader";
import OrderHistoryContent from "./OrderHistoryContent";
import Product1 from "../../../static/Product1.png";
import Product2 from "../../../static/Product2.png";
import Product3 from "../../../static/Product3.png";
import orderService from "../../../services/api/admin/orderService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HiArrowNarrowLeft } from "react-icons/hi";

const styles = {
  cartBorder: "flex shadow-md my-10",
  cart: "w-full bg-white px-10 py-10",
  backButton:
    "flex font-semibold text-indigo-600 text-sm mt-10 items-center gap-x-4 hover:text-[red]",
};
export default function OrderHistory() {
  // const cartLists = [
  //   {
  //     id: 1,
  //     orderNo: "abcdxyz111",
  //     total: 1000000,
  //     createdOn: new Date(),
  //   },
  //   {
  //     id: 2,
  //     orderNo: "abcdxyz1122221",
  //     total: 1000000000,
  //     createdOn: new Date(),
  //   },
  //   {
  //     id: 3,
  //     orderNo: "abcdxyz3333111",
  //     total: 500000,
  //     createdOn: new Date(),
  //   },
  // ];

  const selectedUser = useSelector(state => state.rootReducer.user)
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    orderService.getOrdersById(selectedUser.email).then(res => setOrders(res))
  },[selectedUser])
  return (
    <div className={styles.cartBorder}>
      <div className={styles.cart}>
        <OrderHistoryHeader />
        <OrderHistoryContent data={orders} />
        <div className={styles.backButton}>
          <HiArrowNarrowLeft />
          Continue Shopping
        </div>
      </div>
    </div>
  );
}
