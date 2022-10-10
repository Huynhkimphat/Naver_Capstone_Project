import Image from "next/image";
import Link from "next/link";
import Logo from "../../static/Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
// import { MdLightMode } from "react-icons/md";
// import { MdModeNight } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import { AuthenUserContext } from "../../context/AuthUserContext";
import categoryService from "../../services/api/categoryService";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/actions/category";
import AppSelector from "../../redux/selector";

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
  button: `py-2 px-4 text-[#726E8D] text-bold hover:text-[#FA4A0C]`,
  activeButton: `text-bold text-[#FA4A0C]`,
  navMobileContainer: `flex text-xl gap-5 `,
};

const Header = () => {
  const { categories, status } = useSelector((state) =>
    AppSelector.getAllCategory(state)
  );

  const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    categoryService
      .getAllCategory()
      .then((res) => dispatch(setCategories(res)));
  }, []);

  const { currentUser } = useContext(AuthenUserContext);

  const handleHeaderNavClick = (item) => {
    return router.push(`/product/${item.data.name.toLowerCase()}`);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (innerWidth >= 1024) {
        setIsOpenHamburgerMenu(false);
      }
    });
  }, []);
  const categoryRender = categories?.map((item) => (
    <div
      key={item.id}
      className={`${styles.button} ${
        router.query.slug?.toString().includes(item.data.name.toLowerCase())
          ? styles.activeButton
          : ""
      }`}
      onClick={() => {
        handleHeaderNavClick(item);
      }}
      value={item.data.name}
    >
      {item.data.name}
    </div>
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link className={styles.logoContainer} href="/">
          <Image
            className={styles.logo}
            src={Logo}
            height={30}
            width={65}
            alt={""}
          />
        </Link>
        <div className={styles.headerNav}>{categoryRender}</div>
        <div className={styles.rightNav}>
          <div className={styles.searchIcon}>
            <AiOutlineSearch />
          </div>
          <Link href="/checkout" className={styles.cartIcon}>
            <AiOutlineShoppingCart />
          </Link>
          {!currentUser ? (
            <Link href="/login" className={styles.userIcon}>
              Log In
            </Link>
          ) : (
            <Link href="/user" className={styles.userIcon}>
              <BiUserCircle />
            </Link>
          )}

          <div className={styles.hamburgerMenuIcon}>
            <GiHamburgerMenu
              onClick={() => setIsOpenHamburgerMenu(!isOpenHamburgerMenu)}
            />
          </div>
        </div>
      </div>
      {/* Navbar For  Mobile*/}
      {isOpenHamburgerMenu && (
        <div className={styles.headerNavMobile}>{categoryRender}</div>
      )}
    </div>
  );
};

export default Header;
