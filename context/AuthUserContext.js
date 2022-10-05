import { createContext, useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, query } from "firebase/firestore";
import { db, auth, provider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const AuthenUserContext = createContext();

const AuthenUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addUserToFirebase = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      imageUrl: user.photoURL,
    });
  };

  const logInWithGoogleAccount = async () => {
    try {
      const userData = await signInWithPopup(auth, provider);
      setIsLoading(true);
      setCurrentUser(userData.user);
      await addUserToFirebase(userData.user);
      router.push("/");
      setToken(userData.user.accessToken);
      setIsLoading(false);
    } catch (e) {
      return;
    }
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const logInAdminAccount = async (email, password) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    setIsLoading(true);
    setCurrentUser(userData.user);
    router.push("/");
    setToken(userData.user.accessToken);
    setIsLoading(false);
  };

  const setCurrentUserWithJWT = async (data) => {
    setCurrentUser(data);
  };

  return (
    <AuthenUserContext.Provider
      value={{
        currentUser,
        logInWithGoogleAccount,
        isLoading,
        logInAdminAccount,
        setCurrentUserWithJWT,
      }}
    >
      {children}
    </AuthenUserContext.Provider>
  );
};

export { AuthenUserContext, AuthenUserProvider };
