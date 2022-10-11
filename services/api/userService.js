import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const userService = {
  async getUserByEmail(email) {
    const querySnapshot = await getDoc(doc(db, "users", email));
    const user = querySnapshot.data();
    return user;
  },
};

export default userService;
