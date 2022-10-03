import React from 'react';
import Link from 'next/link';
import { AiOutlineDashboard, AiOutlineHistory, AiOutlineUser } from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
const styles = {
    wrapper: 'w-[60%] p-8 mt-[3rem] z-50 flex flex-col gap-6 text-[#2A2A2A] bg-white h-[100vh] shadow-xl fixed transition-transform sm:w-[20%] sm:mt-[4rem]',
    wrapper_hidden: 'w-[60%] p-8 mt-[3rem] z-50 flex flex-col gap-6 text-[#2A2A2A] bg-white h-[100vh] shadow-xl fixed translate-x-[-100%] transition-transform sm:translate-x-0 sm:w-[20%] sm: mt-[4rem]',
    item: 'flex p-2 gap-4 items-center cursor-pointer transition hover:font-[500] hover:text-[#5842BD]'
}
const Navbar = (props) => {
    return (
        <div className={props.status ? styles.wrapper : styles.wrapper_hidden}>
                <Link href='/admin/dashboard'>
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
            </div>
    );
};

export default Navbar;