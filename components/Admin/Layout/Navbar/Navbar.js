import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthenUserContext } from "../../../../context/AuthUserContext"
import { AiOutlineDashboard, AiOutlineHistory, AiOutlineUser } from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
import { BiCategory, BiHomeAlt, BiLogOut } from 'react-icons/bi';
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
                <div className={styles.item}>
                    <AiOutlineDashboard></AiOutlineDashboard>
                    <a>Analyst</a>
                </div>
            </Link>
            <Link href='/admin/users'>
                <div className={styles.item}>
                    <AiOutlineUser></AiOutlineUser>
                    <a>Users</a>
                </div>
            </Link>
            <Link href='/admin/order'>
                <div className={styles.item}>
                    <BsCardChecklist></BsCardChecklist>
                    <a>Orders</a>
                </div>
            </Link>
            <Link href='/admin/product'>
                <div className={styles.item}>
                    <BiCategory></BiCategory>
                    <a>Products</a>
                </div>
            </Link>
            <Link href='/'>
                <div className={styles.item}>
                    <BiHomeAlt></BiHomeAlt>
                    <a>Home Page</a>
                </div>
            </Link>
            <div className={styles.item} onClick={signOut}>
                <BiLogOut></BiLogOut>
                <a>Sign Out</a>
            </div>
        </div>
    );
};

export default Navbar;