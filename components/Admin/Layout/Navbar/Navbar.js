import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthenUserContext } from "../../../../context/AuthUserContext"
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { BsCardChecklist, BsChatRightDots } from 'react-icons/bs';
import { BiCategory, BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { motion } from 'framer-motion';
const styles = {
    wrapper: 'w-[60%] p-8 mt-[3rem] z-50 flex flex-col gap-6 text-[#2A2A2A] bg-white h-[100vh] shadow-xl fixed transition-transform sm:w-[20%] sm:mt-[4rem]',
    wrapper_hidden: 'w-[60%] p-8 mt-[3rem] z-50 flex flex-col gap-6 text-[#2A2A2A] bg-white h-[100vh] shadow-xl fixed translate-x-[-100%] transition-transform sm:translate-x-0 sm:w-[20%] sm: mt-[4rem]',
    item: 'flex py-2 px-4 text-lg rounded-2xl font-semibold gap-4 items-center cursor-pointer transition hover:font-[700] hover:text-white hover:bg-admin_color'
}
const Navbar = (props) => {
    const { signOut } = useContext(AuthenUserContext)
    return (
        <div className={props.status ? styles.wrapper : styles.wrapper_hidden}>
            <Link href='/admin'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className={styles.item}>
                        <AiOutlineDashboard></AiOutlineDashboard>
                        <a>Analyst</a>
                    </div>
                </motion.div>
            </Link>
            <Link href='/admin/users'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className={styles.item}>
                        <AiOutlineUser></AiOutlineUser>
                        <a>Users</a>
                    </div>
                </motion.div>
            </Link>
            <Link href='/admin/order'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className={styles.item}>
                        <BsCardChecklist></BsCardChecklist>
                        <a>Orders</a>
                    </div>
                </motion.div>
            </Link>
            <Link href='/admin/product'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className={styles.item}>
                        <BiCategory></BiCategory>
                        <a>Products</a>
                    </div>
                </motion.div>
            </Link>
            <Link href='/admin/chat'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className={styles.item}>
                        <BsChatRightDots></BsChatRightDots>
                        <a>Chat</a>
                    </div>
                </motion.div>
            </Link>
            <Link href='/'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className={styles.item}>
                        <BiHomeAlt></BiHomeAlt>
                        <a>Home Page</a>
                    </div>
                </motion.div>
            </Link>
            <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <div className={styles.item} onClick={signOut}>
                    <BiLogOut></BiLogOut>
                    <a>Sign Out</a>
                </div>
            </motion.div>
        </div>
    );
};

export default Navbar;