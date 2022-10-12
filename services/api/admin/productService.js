import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../lib/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage"
const productService = {
    async addProduct(data, images) {
        const newDocRef = doc(collection(db, "product"));
        await setDoc(newDocRef, data);
        uploadBytes(ref(storage, `product/${newDocRef.id}`),images)
    },
}

export default productService;