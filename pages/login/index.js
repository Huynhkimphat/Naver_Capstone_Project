import React from "react";
import Layout from "../../components/Layout";
import Login from "../../components/Login/Login";
import nookies from 'nookies'

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

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)["token"]
  if (cookies) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
