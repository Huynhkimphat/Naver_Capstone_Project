import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const productService = {
  async getAllProducts() {
    const querySnapshot = await getDocs(collection(db, "product"));
    return querySnapshot.docs.map((doc) => {
      const createdDate = doc.data().createdOn;
      return {
        id: doc.id,
        ...doc.data(),
        createdOn: createdDate?.toDate()?.toDateString(),
      };
    });
  },
  
};

export default productService;
