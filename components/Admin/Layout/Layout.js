import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../static/Logo.png";
import UserAvatar from '../../../static/UserProfile.jpg'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import AppSelector from "../../../redux/selector";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
const styles = {
  wrapper: "w-full",
  header:
    "w-full px-8 py-4 flex justify-between items-center text-[1.5rem] fixed top-0 z-[100] bg-white border text-xl",
  logo: "hidden cursor-pointer sm:block sm:px-4",
  menuButton: "sm:hidden",
  content:
    "w-[100%] sm:w-[80%] sm:translate-x-[25%] px-4 p-8 mt-[3rem] sm:mt-[3rem]",
  avatar: "rounded-full",
};
const AdminLayout = (props) => {
  const router = useRouter()
  const userImg = useSelector(state => AppSelector.getUserImageUrl(state))
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <motion.div
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={styles.logo}>
          <Image src={Logo} alt={""}></Image>
        </motion.div>
        <AiOutlineMenuUnfold
          className={styles.menuButton}
          onClick={handleToggle}
        ></AiOutlineMenuUnfold>
        <div className="flex items-center gap-5">
          <GrNotification size={20}></GrNotification>
          <Image className={styles.avatar}
            src={userImg}
            width={40}
            height={40}
            alt={""}></Image>
        </div>
      </div>
      {/* Navbar */}
      <div className="flex">
        <Navbar status={toggleMenu}></Navbar>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
