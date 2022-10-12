import Layout from "../../components/Layout";
import Cart from "../../components/Checkout/Cart/Cart";
import Summary from "../../components/Checkout/Summary/Summary";
import { getServerSideProps } from "../user";
const styles = {
  wrapper: "container mx-auto mt-10",
};

export default function Checkout() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <Cart />
        <Summary />
      </div>
    </Layout>
  );
}
export { getServerSideProps }