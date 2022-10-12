import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    doc,
    query,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const categoryService = {
    async getCategory() {
        const querySnapshot = await getDocs(collection(db, "category"));
        return querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
            };
        });
    },
};

export default categoryService;
