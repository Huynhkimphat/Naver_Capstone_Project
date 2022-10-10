import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useContext, useEffect } from "react";
import { Puff } from "react-loader-spinner";
import { AuthenUserContext } from "../../context/AuthUserContext";
import { useRouter } from "next/router";
const styles = {
  container: ``,
  content: ``,
  main: ``,
  footer: `bg-[#2A254B] flex justify-center`,
};

export default function Layout({ children }) {
  const router = useRouter();
  const { currentUser, setCurrentUserWithJWT, isLoading } =
    useContext(AuthenUserContext);
  const [isRouterValid, setIsRouterValid] = useState(false);

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
    router.events.on("routeChangeStart", (url, { shallow }) => {
      console.log(currentUser)
      console.log(`App is changing to ${url}`);
    });
    router.events.on("routeChangeComplete", (url, { shallow }) => {
      console.log(currentUser)
      console.log(`App is Changed to ${url} complete`);
    });
  }, []);

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
