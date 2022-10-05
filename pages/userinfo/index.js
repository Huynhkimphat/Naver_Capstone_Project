import Layout from "../../components/Layout";

import UserInfo from "../../components/UserInfo/UserInfo.js";
const styles = {
  wrapper: "container mx-auto m-10",
};

export default function userinfo() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <UserInfo />
      </div>
    </Layout>
  );
}
