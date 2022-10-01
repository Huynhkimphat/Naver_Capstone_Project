import Image from "next/image";
import Logo from "../../static/Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
// import { MdLightMode } from "react-icons/md";
// import { MdModeNight } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import { useState, useEffect } from "react";

const styles = {
  wrapper: "p-2",
  content: "flex-1 flex justify-between",
  logoContainer: "flex items-center",
  logo: "cursor-pointer object-contain",
  rightNav: "px-4 flex items-center text-xl gap-3",
  hamburgerMenuIcon: "flex lg:hidden",
  searchIcon: "",
  cartIcon: "",
  userIcon: "",
  headerNav:
    "hidden lg:flex cursor-pointer items-center space-x-2 flex justify-center flex-col lg:flex-row ",
  headerNavMobile:
    "flex lg:hidden cursor-pointer items-center space-x-2 flex justify-center flex-col lg:flex-row",
  button: `py-2 px-4 text-[#726E8D]`,
  activeButton: `text-bold text-[#FA4A0C]`,
  navMobileContainer: `flex text-xl gap-5 `,
};

const Header = () => {
  const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);
  const categoryList = [
    { id: 1, name: "Plant Pots", isActive: 1 },
    { id: 2, name: "Ceramics", isActive: 0 },
    { id: 3, name: "Table", isActive: 0 },
    { id: 4, name: "Chairs", isActive: 0 },
    { id: 5, name: "Crockery", isActive: 0 },
    { id: 6, name: "Tableware", isActive: 0 },
    { id: 7, name: "Cutlery", isActive: 0 },
  ];
  const handleHeaderNavClick = (item) => {
    //
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (innerWidth >= 1024) {
        setIsOpenHamburgerMenu(false);
      }
    });
  }, []);

  const categoryRender = categoryList.map((item) => (
    <div
      key={item.id}
      className={[styles.button, item.isActive ? styles.activeButton : ""]}
      onClick={() => {
        handleHeaderNavClick(item);
      }}
      value={item.name}
    >
      {item.name}
    </div>
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src={Logo}
            height={30}
            width={65}
            alt={""}
          />
        </div>
        <div className={styles.headerNav}>{categoryRender}</div>
        <div className={styles.rightNav}>
          <div className={styles.searchIcon}>
            <AiOutlineSearch />
          </div>
          <div className={styles.cartIcon}>
            <AiOutlineShoppingCart />
          </div>
          <div className={styles.userIcon}>
            <BiUserCircle />
          </div>
          <div className={styles.hamburgerMenuIcon}>
            <GiHamburgerMenu
              onClick={() => setIsOpenHamburgerMenu(!isOpenHamburgerMenu)}
            />
          </div>
        </div>
      </div>
      {/* Navbar For  Mobile*/}
      {isOpenHamburgerMenu && (
        <div className={styles.headerNavMobile}>
          {categoryRender}
          <div className={styles.navMobileContainer}>
            <AiOutlineShoppingCart />
            <BiUserCircle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
