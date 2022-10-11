import React from "react";
import Layout from "../../components/Layout";
import Login from "../../components/Login/Login";

export default function index() {
  const styles = {
    wrapper: "mx-auto",
  };
  return (
    <div className={styles.wrapper}>
      <Layout>
        <Login />
      </Layout>
    </div>
  );
}
