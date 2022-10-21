import React, { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Avt from '../../static/UserProfile.jpg'
import Image from 'next/image';
import { BiLike, BiDislike } from 'react-icons/bi'
import { useSelector } from 'react-redux';
const Comment = (props) => {
    const user = useSelector(state => state.rootReducer.user.user)
    const [searchInput, setSearchInput] = useState('');
    const [commentInput, setCommentInput] = useState('')
    const printListComments = [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
        return (
            <div key={index} className='flex flex-col w-full gap-4 border-b-2 py-4'>
                <div className=' w-10 h-10 rounded-full object-cover'>
                    <Image className='rounded-full' src={Avt} alt=""></Image>
                </div>
                {/* Name - Email - Time Commented */}
                <div className='flex flex-col sm:flex-row flex-wrap justify-between'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                        <span className='font-semibold text-lg'>Nguyễn Đức Hiếu 👨‍🦱</span>
                        <span className='text-slate-500'>hieulechanhkk@gmail.com 📧</span>
                    </div>
                    <span>17 Aug 1954 📅</span>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit 👋, amet consectetur adipisicing elit. Delectus, ipsum. Corrupti harum dolorum incidunt laborum ipsum, voluptatem explicabo exercitationem? Iste, beatae? Nisi consequatur accusantium, maiores magni sunt reiciendis ea hic.</p>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-[#0B7AF5] font-semibold'>Reply</span>
                    <div className='flex gap-3'>
                        <BiLike className='cursor-pointer' size={20}></BiLike>
                        <BiDislike className='cursor-pointer' size={20}></BiDislike>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className=' w-4/5 mx-auto px-8 pt-10 pb-4 flex flex-col gap-4 items-center border-2 rounded-lg'>
            {/* Search review */}
            {/* Header (Title & Filter) */}
            <div className='w-full flex justify-between items-end flex-wrap gap-4 border-b-2 pb-4'>
                <div className='flex w-full sm:w-1/2 lg:w-1/3 items-center justify-between gap-4 flex-wrap'>
                    <h1 className='font-semibold text-xl'>Comments 💌</h1>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='w-full' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search review" />
                    </span>
                </div>
                <Dropdown optionLabel="name" placeholder="Filter" />
            </div>
            {/* List Comments */}
            <div className='w-full h-72 flex flex-col gap-4 overflow-y-auto'>
                {/* Comment */}
                {printListComments}
            </div>
            <span className={`p-input-icon-right w-full`}>
                <i className={`pi pi-send cursor-pointer ${user?.email ? "block" : "hidden"}`}/>
                <InputText className={`w-full ${user?.email ? "block" : "hidden"}`} value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Say something here..." />
            </span>
        </div>
    );
};

export default Comment;