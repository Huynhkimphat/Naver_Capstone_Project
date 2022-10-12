import Layout from "../../components/Layout";

import UserInfo from "../../components/UserInfo/UserInfo.js";
import nookies from 'nookies'
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


export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)["token"]
  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}