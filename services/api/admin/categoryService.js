import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const categoryService = {
    async getCategories() {
        const colRef = collection(db, "category");
        const docsSnap = await getDocs(colRef);
        const categories = docsSnap.docs.map(doc => {
            return doc.data().name
        })
        return categories;
    },
    async addCategory(data) {
        const cateRef = doc(collection(db, "category"));
        await setDoc(cateRef, { name: data });
    },
}

export default categoryService;