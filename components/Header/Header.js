import Image from "next/image";
import Link from "next/link";
import Logo from "../../static/Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
// import { MdLightMode } from "react-icons/md";
// import { MdModeNight } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import { AuthenUserContext } from "../../context/AuthUserContext";
import categoryService from "../../services/api/categoryService";
import userService from "../../services/api/userService";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/actions/categoryAction";
import { setUser } from "../../redux/actions/userAction";
import AppSelector from "../../redux/selector";
import { useRouter } from "next/router";

const styles = {
  wrapper: "px-8 py-2",
  content: "flex-1 flex justify-between",
  logoContainer: "flex items-center",
  logo: "cursor-pointer object-contain",
  rightNav: "px-4 flex items-center text-xl gap-3",
  hamburgerMenuIcon: "flex lg:hidden",
  searchIcon: "",
  cartIcon: "",
  userIcon: "rounder-full",
  headerNav:
    "hidden lg:flex cursor-pointer items-center space-x-2 flex justify-center flex-col lg:flex-row ",
  headerNavMobile:
    "flex lg:hidden cursor-pointer items-center space-x-2 flex justify-center flex-col lg:flex-row",
  button: `py-2 px-4 text-[#726E8D]`,
  activeButton: `text-bold text-[#FA4A0C]`,
  navMobileContainer: `flex text-xl gap-5 `,
  userImage: "rounded-full",
};

const Header = () => {
  const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);
  const categoryList = useSelector((state) => AppSelector.getCategory(state));
  const userEmail = useSelector((state) => AppSelector.getUserEmail(state));
  const userImageUrl = useSelector((state) =>
    AppSelector.getUserImageUrl(state)
  );

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail) {
      userService
        .getUserByEmail(userEmail)
        .then((res) => dispatch(setUser(res)));
    }
    categoryService.getCategory().then((res) => dispatch(setCategory(res)));
  }, []);

  const { currentUser } = useContext(AuthenUserContext);

  const handleHeaderNavClick = (item) => {
    return router.push(`/category/${item.name.toLowerCase()}`);
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
      key={item.name}
      className={`${styles.button} ${
        router.query.slug?.toString().includes(item.name.toLowerCase())
          ? styles.activeButton
          : ""
      }`}
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
            <Link href="/user" className={""}>
              <Image
                className={styles.userImage}
                src={`https://res.cloudinary.com/demo/image/fetch/${userImageUrl}`}
                width={20}
                height={20}
                alt={""}
              />
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
