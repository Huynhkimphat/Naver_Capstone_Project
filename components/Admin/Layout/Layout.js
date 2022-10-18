import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../static/Logo.png";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import AppSelector from "../../../redux/selector";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { db } from "../../../lib/firebase";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import notificationService from "../../../services/api/admin/notificationService";
const styles = {
  wrapper: "w-full select-none",
  header:
    "w-full px-8 py-4 flex justify-between items-center text-[1.5rem] fixed top-0 z-[100] bg-white border text-xl",
  logo: "hidden cursor-pointer sm:block sm:px-4",
  menuButton: "sm:hidden",
  notiContainer: " w-56 h-max-32 flex flex-col gap-1 bg-white fixed right-[8%] top-[4rem] items-center overflow-y-scroll rounded-md",
  content:
    "w-[100%] sm:w-[80%] sm:translate-x-[25%] px-4 p-8 mt-[3rem] sm:mt-[3rem]",
  btnNot: "cursor-pointer",
  avatar: "rounded-full",
};
const AdminLayout = (props) => {
  const router = useRouter()
  const userImg = useSelector(state => AppSelector.getUserImageUrl(state))
  const [toggleMenu, setToggleMenu] = useState(false);
  const [notification, setNotification] = useState([])
  const [toggleNot, setToggleNot] = useState(false)
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  useEffect(() => {
    notificationService.getNotifications().then(res => setNotification(res))
  }, [])
  useEffect(() => {
    (
      async () => {
        const q = query(collection(db, "notification"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const notifications = [];
          querySnapshot.forEach((doc) => {
            notifications.push({
              ...doc.data(),
              id: doc.id
            });
          });
          setNotification(notifications.reverse())
        });
      }
    )()
  }, [db])
  const printNotification = notification.map((noti) => {
    return (
      <div key={noti.id} className=" w-[90%] flex flex-col px-2 py-1 bg-slate-400 rounded-md">
        <span className=" text-xs">{noti.type}</span>
        <span className="text-xs">2032130</span>
      </div>
    )
  })
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
          <div>
            <GrNotification className={styles.btnNot} size={20} onClick={() => setToggleNot(!toggleNot)}></GrNotification>
            <div className={toggleNot ? styles.notiContainer : "hidden"}>
              {printNotification}
            </div>
          </div>
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
