import Layout from "../../components/Layout";
import Filter from "../../components/Filter/Filter";
import Banner from "../../components/Banner/Banner";
import ProductList from "../../components/ProductList/ProductList";
import AttentionContent from "../../components/AttentionContent/AttentionContent";
import { useRouter } from "next/router";
import SearchInput from "../../components/SearchInput/SearchInput"
const styles = {
    wrapper: "container mx-auto mt-10",
    title: "md:text-3xl text-xl text-bold mx-auto mb-4 ml-8 cursor-pointer",
    subTitle: "hover:underline  hover:text-[#FA4A0C]",
};

export default function AllProductPage({ title = "All Products" }) {
    const router = useRouter();
    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    {title !== "All Products" && (
                        <>
                            <span
                                className={styles.subTitle}
                                onClick={() => router.push("/category")}
                            >
                                {`All Products`.toUpperCase()}
                            </span>{" "}
                            {` >`}
                        </>
                    )}
                    {title.toUpperCase()}
                </div>
                <SearchInput/>
                <Filter />
                <ProductList />
                <AttentionContent />
                <Banner />
            </div>
        </Layout>
    );
}
