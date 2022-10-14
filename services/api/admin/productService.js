import { setDoc, doc, collection, updateDoc, FieldPath, arrayUnion,getDocs } from "firebase/firestore";
import { db, storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { async } from "@firebase/util";

const productService = {
    async addProduct(data, images) {
        const newDocRef = doc(collection(db, "product"));
        await setDoc(newDocRef, data);
        // Upload image
        images.forEach((image, index) => {
            const imgType = image.type.split("/")[1];
            const storageRef = ref(storage, `product/${newDocRef.id}/product_${index}.${imgType}`);
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (url) => {
                            const imgName = `img_${index}`;
                            await updateDoc(newDocRef, {
                                images: arrayUnion(url)
                            })
                        })
                }
            )
        });
    },

    async getListProduct() {
        const querySnapshot = await getDocs(collection(db, "product"));
        return querySnapshot.docs.map((doc) => {
            return {
                id: doc.data().id,
                ...doc.data(),
            };
        });


    },
}

export default productService;
