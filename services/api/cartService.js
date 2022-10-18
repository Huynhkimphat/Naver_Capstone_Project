import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  serverTimestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const cartService = {
  async getCartByEmail(email) {
    const querySnapshot = await getDocs(collection(db, "cart"));
    const carts = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return carts.filter((cart) => cart.customerId === email);
  },
  async createNewCartById(email) {
    try {
      await addDoc(collection(db, "cart"), {
        customerId: email,
        dateUpdated: serverTimestamp(),
        total: 0,
        productListDetail: [],
      });
      console.log("Create new cart successful");
    } catch (error) {
      console.log("Fail to create new cart", error);
    }
  },

  async updateCart(id, data) {
    const docRef = doc(db, "cart", id);

    updateDoc(docRef, data)
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default cartService;
