import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const styles = {
  container: ``,
  content: ``,
  main: ``,
};

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
