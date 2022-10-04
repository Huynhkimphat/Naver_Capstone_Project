import Layout from "../../components/Layout";
import Filter from "../../components/Filter/Filter";
import Banner from "../../components/Banner/Banner";

const styles = {
  wrapper: "container mx-auto mt-10",
};

export default function AllProductPage() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        {/* Title */}
        <Filter />
        {/* ProductList */}
        {/* What... */}
        <Banner />
      </div>
    </Layout>
  );
}
