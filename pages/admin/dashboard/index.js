import React, { useRef, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import AdHeader from "../../../components/AdHeader/AdHeader";
import Charts from "../../../components/Charts/Charts";


const styles = {
  wrapper: "",
  titile: " font-bold text-[#535353] ml-4",
};
const index = (props) => {
  
  return (
    <div className={styles.wrapper}>
      <AdminLayout>
        <AdHeader direction={'Analyst > Overview'}></AdHeader>
        <Charts></Charts>
      </AdminLayout>
    </div>
  );
};

export default index;
