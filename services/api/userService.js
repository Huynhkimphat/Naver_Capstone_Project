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
  async updateUser(user){
    const userRef = doc(db, "users", user.email);
    setDoc(userRef, user)
    .then(userRef => {
        console.log("Entire Document has been updated successfully");
    })
    .catch(error => {
        console.log(error);
    })

  }
};


export default userService;
