import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../../lib/firebase"


const orderService = {
    async getOrdersAll() {
        const orderRef = collection(db, "orders");
        const orderSnap = await getDocs(orderRef);
        const ordersList = orderSnap.docs.map(order => {
            const data = order.data();
            return {
                code: order.id,
                customerId: data.customerId,
                date: data.orderDate,
                totalPrice: data.totalPrice,
                status: data.status,
                productListDetail: data.productListDetail
            }
        });
        return ordersList;
    },

    async getOrdersById(id) {
        const orderRef = collection(db, "orders");
        const qr = query(orderRef, where("customerId", "==", id));
        const querySnapshot = await getDocs(qr)
        return querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
        }
        })
    }
}
export default orderService;