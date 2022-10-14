import Layout from "../../components/Layout";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductList from "../../components/ProductList/ProductList";
import AttentionContent from "../../components/AttentionContent/AttentionContent";
import Banner from "../../components/Banner/Banner";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AppSelector from "../../redux/selector";
import { Puff } from "react-loader-spinner";

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
            {router.query.slug ? (
                <div className={styles.wrapper}>
                    <ProductDetail product={product} />
                    <ProductList />
                    <AttentionContent />
                    <Banner />
                </div>
            ) : (
                <Puff
                    height="80"
                    width="80"
                    radisu={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            )}
        </Layout>
    );
}
