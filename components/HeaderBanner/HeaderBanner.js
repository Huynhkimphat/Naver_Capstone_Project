import React from "react";
import Image from "next/image";
import Product1 from "../../static/Product1.png";

const styles = {
  wrapper: "flex lg:p-14 md:p-12 text-white font-normal",
  contentContainer: "w-full md:w-8/12 bg-[#2A254B] lg:p-10 p-6",
  title: "lg:w-3/4 text-3xl",
  mainContent: "flex flex-col lg:flex-col-reverse",
  description: "mt-20 lg:mt-30 md:mt-15 mb-8 lg:mb-0",
  btnViewCollection: "bg-[#F9F9F926] lg:mt-10 py-4 px-8 w-full md:w-auto",
  imgContainer: "md:w-4/12 w-0 relative",
};

const HeaderBanner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          The furniture brand for the future, with timeless designs
        </div>
        <div className={styles.mainContent}>
          <div className={styles.description}>
            A new era in eco friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors and a beautiful way to
            display things digitally using modern web technologies.
          </div>
          <div>
            <button className={styles.btnViewCollection}>View collection</button>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src={Product1} alt={""} layout="fill"/>
      </div>
    </div>
  );
};

export default HeaderBanner;
