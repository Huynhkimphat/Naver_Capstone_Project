import { useRouter } from "next/router";

const styles = {
  content:
    "text-white flex flex-col gap-y-3 lg:w-1/4 md:w-1/2 w-full flex items-center",
  title: "text-bold text-xl",
  footerItem: "hover:text-[red] cursor-pointer",
};

const FooterList = (props) => {
  const router = useRouter();
  const footerList = props.footerList;
  const footerItemRendering = footerList?.map((item) => (
    <div key={item.id} className={styles.footerItem}>
      {item.name}
    </div>
  ));
  return (
    <div className={styles.content}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.footerItem} onClick={() => router.push("https://portfolio-hkp.vercel.app/about-us")}>
        About
      </div>
      {footerItemRendering}
    </div>
  );
};

export default FooterList;
