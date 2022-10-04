import Layout from "../components/Layout";
import ProductDetail from "../components/ProductDetail/ProductDetail"

const styles = {
  wrapper: "mx-auto",
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Layout>
        <ProductDetail/>
      </Layout>
    </div>
  );
}
