import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"


const userService = {
    async getUsersAll() {
        const userRef = collection(db, "users");
        const userSnap = await getDocs(userRef);
        const usersList = userSnap.docs.map(user => {
            const data = user.data();
            return {
                name: data.name,
                images: data.imageUrl,
                email: data.email,
                address: data.address,
                phone: data.phone,
                id: data.id,
                date: data.userDate,
            }
        });

        return usersList;
    },
}
export default userService;