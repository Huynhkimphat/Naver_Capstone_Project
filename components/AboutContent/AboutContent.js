import Image from "next/image";
import { useState, useEffect } from "react";

const styles = {
  wrapper: "mx-auto flex md:flex-row flex-col",
  wrapperReverse: "mx-auto  flex md:flex-row-reverse flex-col-reverse",
  content: "flex md:w-1/2 w-full flex-col gap-y-6 justify-center md:px-28",
  title: "font-semibold text-2xl mt-4",
  labelContainer: "flex flex-col gap-y-6",
  img: "flex flex-end md:w-1/2 w-full md:relative static  ",
  logo: "cursor-pointer object-cover",
  buttonContainer:"flex justify-center md:justify-start mt-[-1rem] mb-[1rem]",
  button:
    "bg-[#F9F9F9] text-center rounded-full w-[10rem] p-2 hover:font-semibold cursor-pointer hover:bg-[#ccc]",
};

export default function AboutContent({ data }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (innerWidth <= 768) {
        setIsMobile(true);
        return;
      }
      setIsMobile(false)
    });
  }, []);
  return (
    <div className={data.isReverse ? styles.wrapperReverse : styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.labelContainer}>
          <div className={styles.label}>{data.label1}</div>
          <div className={styles.label}>{data.label2}</div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>Get in touch</div>
          </div>
        </div>
      </div>
      <div className={styles.img}>
        <Image
          className={styles.logo}
          src={data.logo}
          alt={""}
          layout={!isMobile ? "fill" : ""}
        />
      </div>
    </div>
  );
}
