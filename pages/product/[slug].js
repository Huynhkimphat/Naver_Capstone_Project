import Layout from "../../components/Layout";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductList from "../../components/ProductList/ProductList";
import AllProductPage from "./index";
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
  const categories = useSelector((state) => AppSelector.getAllCategory(state));
  const checkIsDetail = () => {
    categories.map((cate) => {
      console.log(cate.data.name,start)
      if (
        router.query.path?.toString().includes(cate.data.name.toLowercase())
      ) {
        console.log(cate.data.name.toLowercase())
        return false;
      }
    });
    console.log(cate.data.name.toLowercase(),true)
    return true;
  };
  const renderPage = () => {
    return checkIsDetail ? (
      <Layout>
        <div className={styles.wrapper}>
          <ProductDetail />
          <ProductList />
          <AttentionContent />
          <Banner />
        </div>
      </Layout>
    ) : (
      <AllProductPage />
    );
  };
  return <>{renderPage()}</>;
}
