import React from "react";
import Image from "next/image";
import HeaderBannerImg from "../../static/headerBanner.jpg";

const styles = {
  wrapper: "flex justify-center lg:px-20 lg:pt-14 text-white font-normal pb-10",
  contentContainer: "w-full md:w-4/12 bg-[#2A254B] lg:p-10 p-6",
  title: "lg:w-3/4 text-3xl",
  mainContent: "flex flex-col lg:flex-col-reverse",
  description: "mt-20 lg:mt-30 md:mt-15 mb-8 lg:mb-0",
  btnViewCollection:
    "bg-[#F9F9F926] lg:px-8 lg:py-4 p-2 lg:mt-10 text-center md:w-8/12 w-full",
  imgContainer: "md:w-8/12 w-0 relative",
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
        <Image
          className={styles.img}
          src={HeaderBannerImg}
          alt={""}
          layout="fill"
        />
      </div>
    </div>
  );
};

export default HeaderBanner;
