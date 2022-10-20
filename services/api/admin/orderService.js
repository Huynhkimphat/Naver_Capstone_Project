import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

const orderService = {
  async getOrdersAll() {
    const orderRef = collection(db, "orders");
    const orderSnap = await getDocs(orderRef);
    const ordersList = orderSnap.docs.map((order) => {
      const data = order.data();
      return {
        code: order.id,
        customerId: data.customerId,
        date: data.orderDate,
        totalPrice: data.totalPrice,
        status: data.status,
        productListDetail: data.productListDetail,
      };
    });
    return ordersList;
  },

  async getOrdersById(id) {
    const orderRef = collection(db, "orders");
    const qr = query(orderRef);
    const querySnapshot = await getDocs(qr);
    const orders = querySnapshot.docs.map((doc) => {
      const createdDate = doc.data().orderDate;
      return {
        id: doc.id,
        ...doc.data(),
        orderDate: createdDate?.toDate()?.toDateString(),
      };
    });
    return orders.filter((order) => order.customerId === id);
  },

  async getOrderById(id){
    const querySnapshot = await getDoc(doc(db, "orders", id));
    const order = querySnapshot.data();
    return order;
  },

  async createOrder(data) {
    const order= {
        ...data,
        orderDate:serverTimestamp(),
    }
    await addDoc(collection(db,"orders"),order);
  },
};
export default orderService;
