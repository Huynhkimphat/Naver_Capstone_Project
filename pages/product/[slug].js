import Layout from "../../components/Layout";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductList from "../../components/ProductList/ProductList";
import AttentionContent from "../../components/AttentionContent/AttentionContent";
import Banner from "../../components/Banner/Banner";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AppSelector from "../../redux/selector";

const styles = {
  wrapper: "container mx-auto mt-10",
};

export default function ProductDetailPage() {
  const router = useRouter();

  const productId = router.query.slug;
  const productList = useSelector((state) => AppSelector.getProduct(state));
  const product = productList.filter((item) => item.id === productId);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <ProductDetail product={product} />
        <ProductList />
        <AttentionContent />
        <Banner />
      </div>
    </Layout>
  );
}
