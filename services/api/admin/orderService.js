import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"


const orderService = {
    async getOrdersAll() {
        const orderRef = collection(db, "orders");
        const orderSnap = await getDocs(orderRef);
        const ordersList = orderSnap.docs.map(order => {
            const data = order.data();
            return {
                code: order.id,
                date: data.orderDate,
                totalPrice: data.totalPrice,
                status: data.status,
                productListDetail: data.productListDetail
            }
        });
        return ordersList;
    },
}
export default orderService;