import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Cart from "../../components/Checkout/Cart/Cart";
import Summary from "../../components/Checkout/Summary/Summary";

const styles = {
  wrapper: "container mx-auto mt-10",
};

export default function OrderDetail() {
  const router = useRouter();
  const orderNo = router.query.slug;
  return (
    <Layout>
      <div className={styles.wrapper}>
        <Cart orderNo={orderNo} />
        <Summary orderNo={orderNo} />
      </div>
    </Layout>
  );
}
