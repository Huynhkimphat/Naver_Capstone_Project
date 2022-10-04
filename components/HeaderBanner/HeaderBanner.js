import React from "react";
import Image from "next/image";
import Product1 from "../../static/Product1.png";

const styles = {
  wrapper: "flex lg:px-20 lg:pt-14 text-white font-normal",
  contentContainer: "w-full lg:w-3/5 bg-[#2A254B] lg:p-14 p-6",
  title: "lg:w-3/4 text-3xl",
  mainContent: "flex flex-col lg:flex-col-reverse",
  description: "mt-20 lg:mt-48 mb-8 lg:mb-0",
  btnViewCollection: "bg-[#F9F9F926] px-8 py-4 lg:mt-10 text-center lg:w-1/3",
  imgContainer: "lg:w-2/5 w-0",
  img: "object-conver"
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
          <button className={styles.btnViewCollection}>View collection</button>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={Product1} alt={""} />
      </div>
    </div>
  );
};

export default HeaderBanner;
