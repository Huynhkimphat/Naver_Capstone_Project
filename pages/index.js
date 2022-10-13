import Layout from "../components/Layout";
import HeaderBanner from "../components/HeaderBanner/HeaderBanner";
import ProductList from "../components/ProductList/ProductList";
import AttentionContent from "../components/AttentionContent/AttentionContent";
import Banner from "../components/Banner/Banner";
import { useSelector } from "react-redux";
import AppSelector from "../redux/selector";

const styles = {
  wrapper: "mx-auto",
  title: "md:text-3xl text-xl text-bold mx-auto mb-4 ml-8 cursor-pointer mt-4",
};
export default function Home() {
  const categoryList = useSelector((state) => AppSelector.getCategory(state));
  return (
    <div className={styles.wrapper}>
      <Layout>
        <HeaderBanner />
        {categoryList.map((cate) => (
          <>
            <div className={styles.title}>{cate.name.toUpperCase()}</div>
            <ProductList viewCollection={true} category={cate.name} />
          </>
        ))}
        <AttentionContent />
        <Banner />
      </Layout>
    </div>
  );
}
