import { createContext, useEffect, useState } from "react";
import { collection, getDocs,getDoc, setDoc, doc, query } from "firebase/firestore";
import { db, auth, provider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserEmail, resetUser } from "../redux/actions/userAction";

import { parseCookies, setCookie, destroyCookie } from "nookies";

const AuthenUserContext = createContext();

const AuthenUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const addUserToFirebase = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      imageUrl: user.photoURL,
    });
  };

  const logInWithGoogleAccount = async () => {
    try {
      const cookies = parseCookies();
      const userData = await signInWithPopup(auth, provider);
      setIsLoading(true);
      const googleAccountUser = await  getDoc(doc(db, "users", userData.user.email));
      if (!googleAccountUser.data()) {
        await addUserToFirebase(userData.user);
      }
      setCurrentUser(userData.user);
      setToken(userData.user.accessToken);
      dispatch(setUserEmail(userData.user.email));
      setCookie({}, "token", userData.user.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      await router.push("/");
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

  const resetCurrentUser = () => setCurrentUser(null);

  const logInAdminAccount = async (email, password) => {
    const cookies = parseCookies();
    const userData = await signInWithEmailAndPassword(auth, email, password);
    setIsLoading(true);
    setCurrentUser(userData.user);
    setToken(userData.user.accessToken);
    dispatch(setUserEmail(userData.user.email));
    setCookie({}, "token", userData.user.accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    await router.push("/");
    setIsLoading(false);
  };

  const setCurrentUserWithJWT = async (data) => {
    setCurrentUser(data);
  };

  const signOut = () => {
    setIsLoading(true);
    resetCurrentUser();
    clearToken();
    dispatch(resetUser());
    destroyCookie({}, "token");
    router.push("/");
    setIsLoading(false);
  };
  return (
    <AuthenUserContext.Provider
      value={{
        currentUser,
        logInWithGoogleAccount,
        isLoading,
        logInAdminAccount,
        setCurrentUserWithJWT,
        signOut,
      }}
    >
      {children}
    </AuthenUserContext.Provider>
  );
};

export { AuthenUserContext, AuthenUserProvider };
