import Social from "./Social/Social";
import About from "./About/About";
import FooterList from "./FooterList/FooterList";

const styles = {
  wrapper: "p-8 flex flex-col p-5 container",
  content: "flex justify center flex-wrap gap-y-6",
  divider:
    "border-solid border-y border-white mx-auto sm:max-w-[55rem] mt-8 mb-8",
  footerTitle: "sm:text-sm text-xs text-white flex justify-center items-center",
};

const Footer = () => {
  const menuList = [
    { id: 1, name: "New Arrivials" },
    { id: 2, name: "Best Sellers" },
    { id: 3, name: "Recently Viewed" },
    { id: 4, name: "Popular this week" },
    { id: 5, name: "All product" },
  ];
  const categoryList = [
    { id: 1, name: "Crockery" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Homeware" },
    { id: 4, name: "Plant pots" },
    { id: 5, name: "Chairs" },
    { id: 6, name: "Cutlery" },
  ];
  const ourCompanyList = [
    { id: 1, name: "Vacancies" },
    { id: 2, name: "Contact Us" },
    { id: 3, name: "Privacy" },
    { id: 4, name: "Returns policy" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <About />
        <Social />
        <FooterList title={"Menu"} footerList={menuList} />
        {/* <FooterList title={"Category"} footerList={categoryList} /> */}
        <FooterList title={"Our Company"} footerList={ourCompanyList} />
      </div>
      <div className={styles.copyright}>
        <div className={styles.divider} />
        <div className={styles.footerTitle}>Copyright 2022 Avion LTD</div>
      </div>
    </div>
  );
};

export default Footer;
