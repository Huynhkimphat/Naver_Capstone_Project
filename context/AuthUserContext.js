import { createContext, useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, query } from "firebase/firestore";
import { db, auth, provider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const AuthenUserContext = createContext();

const AuthenUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const addUserToFirebase = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      imageUrl: user.photoURL,
    });
  };

  const logInWithGoogleAccount = async () => {
    const userData = await signInWithPopup(auth, provider);
    setCurrentUser(userData.user);
    await addUserToFirebase(userData.user);
    setToken(userData.user.accessToken);
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const logInAdminAccount = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setToken(user.accessToken);
      })
      .catch((error) => {});
  };

  return (
    <AuthenUserContext.Provider
      value={{ currentUser, logInWithGoogleAccount, logInAdminAccount }}
    >
      {children}
    </AuthenUserContext.Provider>
  );
};

export { AuthenUserContext, AuthenUserProvider };
