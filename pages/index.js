import Layout from "../components/Layout";
import HeaderBanner from "../components/HeaderBanner/HeaderBanner";
import ProductList from "../components/ProductList/ProductList";
import AttentionContent from "../components/AttentionContent/AttentionContent";
import Banner from "../components/Banner/Banner";

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
