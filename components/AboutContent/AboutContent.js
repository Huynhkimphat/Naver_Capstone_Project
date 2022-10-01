import Image from "next/image";

const styles = {
  wrapper: "mx-auto flex md:flex-row flex-col",
  wrapperReverse: "mx-auto  flex md:flex-row-reverse flex-col-reverse",
  content: "flex flex-col gap-y-6 justify-center md:px-28 p-8",
  title: "font-semibold text-2xl",
  labelContainer: "flex flex-col gap-y-6",
  img: "flex flex-end",
  logo: "cursor-pointer object-contain",
  buttonContainer:"flex justify-center md:justify-start",
  button:
    "bg-[#F9F9F9] text-center rounded-full w-[10rem] p-2 hover:font-semibold cursor-pointer hover:bg-[#ccc]",
};

export default function AboutContent({ data }) {
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
        <Image className={styles.logo} src={data.logo} alt={""} />
      </div>
    </div>
  );
}
