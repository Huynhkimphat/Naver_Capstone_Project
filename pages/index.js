import Layout from "../components/Layout";
import HeaderBanner from "../components/HeaderBanner/HeaderBanner";
import Banner from "../components/Banner/Banner";

const styles = {
  wrapper: "mx-auto",
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Layout>
        <HeaderBanner />
        {/* ProductList */}
        {/* What... */}
        <Banner />
      </Layout>
    </div>
  );
}
