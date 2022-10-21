import Layout from "../components/Layout";
import HeaderBanner from "../components/HeaderBanner/HeaderBanner";
import ProductList from "../components/ProductList/ProductList";
import AttentionContent from "../components/AttentionContent/AttentionContent";
import Banner from "../components/Banner/Banner";
import { useSelector } from "react-redux";
import AppSelector from "../redux/selector";
import Scroll from "../components/Admin/Animation/Scroll"
const styles = {
  wrapper: "mx-auto",
  title: "md:text-3xl text-xl bg- text-bold mx-auto mb-4 ml-8 cursor-pointer mt-4 bg-dark_blue rounded-lg w-fit px-4 py-3 text-white",
};
export default function Home() {
  const categoryList = useSelector((state) => AppSelector.getCategory(state));
  return (
    <div className={styles.wrapper}>
      <Layout>
        <Scroll loop={"all"} scroll={"translateY(-75px)"}>
          <HeaderBanner />
        </Scroll>
        {categoryList.map((cate, index) => (
          <>
            <Scroll loop={"all"} scroll={"translateX(-50px)"}>
              <div className={styles.title}>{cate.name.toUpperCase()}</div>
            </Scroll>
            <Scroll loop={"all"} scroll={"translateY(150px)"}>
              <ProductList viewCollection={true} category={cate.name} />
            </Scroll>
          </>
        ))}
        <AttentionContent />
        <Banner />
      </Layout>
    </div >
  );
}
