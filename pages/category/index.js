import Layout from "../../components/Layout";

const styles = {
  wrapper: "mx-auto",
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Layout>
        <h1>Category</h1>
      </Layout>
    </div>
  );
}