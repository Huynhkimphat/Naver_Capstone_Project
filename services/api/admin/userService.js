import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"


const userService = {
    async getAllUsers () {
        const ref = await getDocs(collection(db, "users"));
        return ref.docs.map((doc => {
            return {...doc.data()}
        }))
    },
}
export default userService;