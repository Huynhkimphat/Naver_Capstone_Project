import React, { useRef, useEffect } from "react";
import Layout from "../../../components/Admin/Layout/Layout";
import Header from "../../../components/Admin/Header/Header";
import Charts from "../../../components/Admin/Charts/Charts";

const styles = {
  wrapper: ""
};
const index = (props) => {
  
  return (
    <div className={styles.wrapper}>
      <Layout>
        <Header direction={'Analyst > Overview'}></Header>
        <Charts></Charts>
      </Layout>
    </div>
  );
};

export default index;
