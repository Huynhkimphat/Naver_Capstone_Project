import { setDoc, doc, collection, updateDoc, serverTimestamp, arrayUnion, query, where, documentId, getDoc, getDocs} from "firebase/firestore";
import { db, storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable,deleteObject } from "firebase/storage"
import { async } from "@firebase/util";

const productService = {
    async addProduct(data, images) {
        const newDocRef = doc(collection(db, "product"));
        await setDoc(newDocRef, {
            ...data,
            createdOn: serverTimestamp(),
        });
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

    async getProductsByIds(data) {
        const ref = collection(db, "product")
        return await Promise.all(
            data.map(async (item) => {
                const snap = await getDoc(doc(db, 'product', item.productId))
                return { ...snap.data() }
            })
        )
    },
    async getProductDetail(productId) {
        const docRef = doc(db, "product", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { ...docSnap.data() }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }


    },

    async UpdateProduct(productID, dataUpdate, updateImage) {
        const docRef = doc(db, "product", productID);
        await updateDoc(docRef, dataUpdate);
        const newDocRef = doc(collection(db, "product"));
        //update image
        updateImage.forEach((image, index) => {
            //const imgType = image.type.toString().split("/")[1];
            const storageRef = ref(storage, `product/${productID}/${image.name.toString()}`);
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
                            await updateDoc(docRef, {
                                images: arrayUnion(url)
                            })
                        })
                }
            )
        });

    },
    async DeleteProductImage(imgURL) {
        if (imgURL === "") {
            console.log("Nothing image to update")
        } else {
            //delete image
            const desertRef = ref(storage, imgURL);
            await deleteObject(desertRef)
        }
    },

}

export default productService;
