import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Logo from "../../static/Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { MdLightMode } from "react-icons/md";
// import { MdModeNight } from "react-icons/md";
import { AuthenUserContext } from "../../context/AuthUserContext";
import categoryService from "../../services/api/categoryService";
import userService from "../../services/api/userService";
import productService from "../../services/api/productService";
import cartService from "../../services/api/cartService";
import { setCategory } from "../../redux/actions/categoryAction";
import { setUser } from "../../redux/actions/userAction";
import { setProductList } from "../../redux/actions/productAction";
import { setCart } from "../../redux/actions/cartAction";
import AppSelector from "../../redux/selector";

const styles = {
  wrapper: "px-8 py-2 shadow-md sticky top-0 z-50 bg-white",
  content: "flex-1 flex justify-between",
  logoContainer: "flex items-center",
  logo: "cursor-pointer object-contain",
  rightNav: "px-4 flex items-center text-xl gap-3",
  hamburgerMenuIcon: "flex lg:hidden",
  searchIcon: "cursor-pointer",
  cartIcon: "py-3",
  userIcon: "rounder-full",
  headerNav:
    "hidden lg:flex cursor-pointer items-center space-x-2 flex justify-center flex-col lg:flex-row ",
  headerNavMobile:
    "flex lg:hidden cursor-pointer items-center space-x-2 flex justify-center flex-col lg:flex-row",
  button: `py-2 px-4 text-[#726E8D]`,
  activeButton: `text-bold text-[#FA4A0C]`,
  navMobileContainer: `flex text-xl gap-5 `,
  userImage: "rounded-full",
  cartIconContainer: "flex",
  numberProduct: "text-[16px] pb-4 text-extrabold",
};

const Header = () => {
  const [isOpenHamburgerMenu, setIsOpenHamburgerMenu] = useState(false);
  const categoryList = useSelector((state) => AppSelector.getCategory(state));
  const userEmail = useSelector((state) => AppSelector.getUserEmail(state));
  const userImageUrl = useSelector((state) =>
    AppSelector.getUserImageUrl(state)
  );
  const cart = useSelector(state => state.rootReducer.cart.cart)

  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    if (userEmail) {
      userService
        .getUserByEmail(userEmail)
        .then((res) => dispatch(setUser(res)));
      cartService.getCartByEmail(userEmail).then((res) => {
        if (!res?.length) {
          console.log("Creating New Cart For ", userEmail);
          cartService.createNewCartById(userEmail);
        }
        dispatch(setCart(res));
      });
    }
    categoryService.getCategory().then((res) => dispatch(setCategory(res)));
    productService
      .getAllProducts()
      .then((res) => dispatch(setProductList(res)));
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
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
    </motion.div>
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link className={styles.logoContainer} href="/">
            <Image
              className={styles.logo}
              src={Logo}
              height={30}
              width={65}
              alt={""}
            />
          </Link>
        </motion.div>
        <div className={styles.headerNav}>{categoryRender}</div>
        <div className={styles.rightNav}>
          <motion.div
            className={styles.searchIcon}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/category">
            <AiOutlineSearch />
            </Link>
          </motion.div>
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/checkout">
              <div className={styles.cartIconContainer}>
                <div className={styles.cartIcon}>
                  <AiOutlineShoppingCart />
                </div>
                <div className={styles.numberProduct}>{userEmail ? cart?.productListDetail?.length : ""}</div>
              </div>
            </Link>
          </motion.div>
          {!currentUser ? (
            <Link href="/login" className={styles.userIcon}>
              Log In
            </Link>
          ) : (
            <motion.div
              className="h-fit cursor-pointer flex items-center"
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/user" className={""}>
                <Image
                  className={styles.userImage}
                  src={`https://res.cloudinary.com/demo/image/fetch/${userImageUrl}`}
                  width={20}
                  height={20}
                  alt={""}
                />
              </Link>
            </motion.div>
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
