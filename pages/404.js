import Image from 'next/image';
import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import Gif from '../static/404.gif'
const Custom404 = (props) => {
    const router = useRouter();
    return (
        <div className='w-full h-[100vh] mx-auto flex flex-col justify-center items-center'>
            <h1 className=' text-3xl font-extrabold text-red-500'>404</h1>
            <h1 className='text-xl font-extrabold text-red-500'>PAGE NOT FOUND</h1>
            <div className='w-1/2 h-1/2 relative'>
                <Image src={Gif}
                    layout="fill"
                    alt='404 GIF'
                    objectFit="contain"></Image>
            </div>
            <h1 className='text-2xl font-semibold mb-8 text-slate-500'>Oh no, there&apos;s nothing here 🤨</h1>
            <motion.div
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                transition={{type: "spring", stiffness: 800, damping:10}}
            >
                <Button
                    className='p-button-rounded p-button-secondary p-button-sm'
                    iconPos='left'
                    icon="pi pi-home"
                    onClick={() => router.push("/")}
                    label='GO HOME'></Button>
            </motion.div>
        </div>
    );
};

export default Custom404;