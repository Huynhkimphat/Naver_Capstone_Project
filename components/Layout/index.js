import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useContext, useEffect } from "react";
import { Puff } from "react-loader-spinner";
import { AuthenUserContext } from "../../context/AuthUserContext";
import Chat from "../Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { chatNotification } from "../../redux/actions/chatAction";

const styles = {
  container: ``,
  content: ``,
  main: ``,
  footer: `bg-[#2A254B] flex justify-center`,
};

export default function Layout({ children }) {
  const { setCurrentUserWithJWT, isLoading } = useContext(AuthenUserContext);
  const user = useSelector(state => state.rootReducer.user.user);
  const dispatch = useDispatch();
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setCurrentUserWithJWT(parseJwt(token));
  }, []);

  useEffect(() => {
    const q = query(collection(db, "users"), where("email", "==", user?.email==undefined ? "none" : user?.email));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New: ", change.doc.data().lastMessage);
        }
        if (change.type === "modified") {
          // console.log("Modified: ", change.doc.data().lastMessage);
          dispatch(chatNotification(true))
        }
        if (change.type === "removed") {
          // console.log("Removed: ", change.doc.data().lastMessage);
        }
      });
    });
    return () => {
      unsubscribe()
    }
  }, [user])
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Puff
          height="80"
          width="80"
          radisu={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className={styles.content}>
          <Chat></Chat>
          <Header />
          <div className={styles.main}>{children}</div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
