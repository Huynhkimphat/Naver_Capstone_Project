import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../../../lib/firebase"


const notificationService = {
    async getNotifications() {
        const q = query(collection(db, "notification"), orderBy("createdAt"), limit(15));
        const querySnapshot = await getDocs(q);
        return (querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })).reverse();
    }
}

export default notificationService;