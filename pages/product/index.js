import Layout from "../../components/Layout";
import Filter from "../../components/Filter/Filter";
import Banner from "../../components/Banner/Banner";
import ProductList from "../../components/ProductList/ProductList";
import AttentionContent from "../../components/AttentionContent/AttentionContent";
import { useRouter } from "next/router";
import { Puff } from "react-loader-spinner";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useState } from "react";
const styles = {
  wrapper: "container mx-auto mt-10",
  title: "md:text-3xl text-xl text-bold mx-auto mb-4 ml-8 cursor-pointer",
  subTitle: "hover:underline  hover:text-[#FA4A0C]",
};

export default function AllProductPage({ title = "All Products" }) {
  const [priceDesc, setPriceDesc] = useState(2);
  const [dateDesc, setDateDesc] = useState(2);
  const [productName, setProductName] = useState("");
  const router = useRouter();

  const searchProduct = (name) => {
    setProductName(name);
  };
  //if 2 -> not sort
  // if 1 -> acs
  //  if 0 ->desc

  //if 2 -> not Sort
  //if 1-> newest
  //if 0 -> oldest
  const updatePriceFilter = (desc) => {
    setPriceDesc(desc);
  };
  const updateDateFilter = (desc) => {
    setDateDesc(desc);
  };
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
              </span>
              {` >`}
            </>
          )}
          {title.toUpperCase()}
        </div>
        <SearchInput handleSearchInput={searchProduct} />
        <Filter
          handleFilterPriceUpdate={updatePriceFilter}
          handleFilterDateUpdate={updateDateFilter}
        />
        {!router.pathname.includes("[slug]") || router.query.slug ? (
          <ProductList
            category={router.query.slug}
            priceDescSort={priceDesc}
            dateDescSort={dateDesc}
            productNameSearch={productName}
          />
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
        <AttentionContent />
        <Banner />
      </div>
    </Layout>
  );
}
