import React, { useRef, useEffect } from "react";
import Layout from "../../components/Admin/Layout/Layout";
import Header from "../../components/Admin/Header/Header";
import Charts from "../../components/Admin/Charts/Charts";
import nookies from 'nookies'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import jwtDecode from "jwt-decode";
const styles = {
  wrapper: ""
};
const index = (props) => {

  return (
    <div className={styles.wrapper}>
      <Layout>
        <Header direction={'Analyst / Overview'}></Header>
        <Charts></Charts>
      </Layout>
    </div>
  );
};

export default index;

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)["token"]
  if (cookies !== undefined) {
    const { email } = jwtDecode(cookies)
    let adminData;
    const getData = async () => {
      const docRef = doc(db, "users", email);
      try {
        const docSnap = await getDoc(docRef);
        const rs = docSnap.data();
        return rs;
      } catch (error) {
        console.log(error)
      }
    }
    adminData = await getData()
    if (cookies) {
      if (!adminData.isAdmin) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
      else return { props: {} }
    }
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    }
  }
}