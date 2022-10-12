import Layout from "../../components/Layout";
import OrderHistory from "../../components/Order/OrderHistory/OrderHistory";
import { getServerSideProps } from '../user'
const styles = {
  wrapper: "container mx-auto mt-10",
};

export default function Order() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <OrderHistory />
      </div>
    </Layout>
  );
}

export { getServerSideProps }