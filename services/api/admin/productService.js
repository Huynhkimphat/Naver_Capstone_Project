import { setDoc, doc, collection } from "firebase/firestore";
import { db, storage } from "../../../lib/firebase";
import { ref, uploadBytesResumable } from "firebase/storage"

const productService = {
    async addProduct(data, images) {
        const newDocRef = doc(collection(db, "product"));
        await setDoc(newDocRef, data);

        // Upload image
        images.forEach((image, index) => {
            const imgType = image.type.split("/")[1];
            const storageRef = ref(storage, `product/${newDocRef.id}/product_${index}.${imgType}`);
            uploadBytesResumable(storageRef, image)
        });
    },
}

export default productService;