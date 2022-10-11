import Layout from "../components/Layout";
import HeaderBanner from "../components/HeaderBanner/HeaderBanner";
import ProductList from "../components/ProductList/ProductList";
import AttentionContent from "../components/AttentionContent/AttentionContent";
import Banner from "../components/Banner/Banner";
import { AuthenUserContext } from "../context/AuthUserContext";
import { useContext, useEffect } from "react";
import { async } from "@firebase/util";
import nookies from 'nookies'
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
const styles = {
  wrapper: "mx-auto",
};
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Layout>
        <HeaderBanner />
        <ProductList />
        <AttentionContent />
        <Banner />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)["token"]
  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}