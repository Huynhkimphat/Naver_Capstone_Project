import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../static/Logo.png";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import Navbar from "./Navbar/Navbar";
const styles = {
  wrapper: "w-full",
  header:
    "w-full px-8 py-4 flex justify-between items-center text-[1.5rem] fixed top-0 z-[100] bg-white border text-xl",
  logo: "hidden sm:block",
  menuButton: "sm:hidden",
  content:
    "w-[100%] sm:w-[80%] sm:translate-x-[25%] px-4 p-8 mt-[3rem] sm:mt-[3rem]",
  avatar: "w-[16px] h-[16px] rounded-[50%]",
};
const AdminLayout = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={Logo} alt={""}></Image>
        </div>
        <AiOutlineMenuUnfold
          className={styles.menuButton}
          onClick={handleToggle}
        ></AiOutlineMenuUnfold>
        <div className="flex">
          <GrNotification></GrNotification>
          <Image className={styles.avatar} src={Logo} alt={""}></Image>
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
