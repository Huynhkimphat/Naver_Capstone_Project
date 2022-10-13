import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    doc,
    query,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getStorage, ref, listAll } from "firebase/storage";

const storage = getStorage();
const productService = {
    async getAllProducts() {
        const querySnapshot = await getDocs(collection(db, "product"));
        return querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
            };
        });
    },
};

export default productService;

  
 
  