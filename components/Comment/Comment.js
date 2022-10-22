import React, { useEffect, useRef, useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Avt from '../../static/UserProfile.jpg'
import Image from 'next/image';
import { BiLike, BiDislike } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import commentService from '../../services/api/commentService';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Scroll from '../Admin/Animation/Scroll';
import { motion } from "framer-motion"

const Comment = (props) => {
    const user = useSelector(state => state.rootReducer.user.user)
    const [searchInput, setSearchInput] = useState('');
    const [commentInput, setCommentInput] = useState('');
    const [isScrollBot, setIsScrollBot] = useState(false);
    const cmtRef = useRef(null)
    const [comments, setComments] = useState([]) //This very important
    // Convert long number to string k m b
    const intToString = (value) => {
        var suffixes = ["", "k", "m", "b", "t"];
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue + suffixes[suffixNum];
    }
    const updateLikeNDislike = (comment, index, type) => {
        const data = type == "like" ? {
            ...comment,
            like: Number(comment.like + 1)
        } : {
            ...comment,
            dislike: Number(comment.dislike + 1)
        }
        comments[index] = data;
        commentService.updateLikeNDisLike(props.productId, comments.reverse())
    }
    const printListComments = comments?.map((comment, index) => {
        const { commenter } = comment;
        const date = comment?.createdAt.toDate().toDateString();
        const time = comment?.createdAt.toDate().toLocaleTimeString([], { timeStyle: 'short' });
        const like = intToString(comment?.like)
        const dislike = intToString(comment?.dislike)
        return (
            <Scroll loop={"all"} key={index} scroll={"translateY(60px)"}>
                <div className='flex flex-col w-full gap-4 border-b-2 py-4'>
                    <div className=' w-10 h-10 rounded-full object-cover'>
                        <Image className='rounded-full' src={commenter?.imageUrl} width={50} height={50} alt=""></Image>
                    </div>
                    {/* Name - Email - Time Commented */}
                    <div className='flex flex-col sm:flex-row flex-wrap justify-between'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                            <span className='font-semibold text-lg'>{commenter?.name} 👨‍🦱</span>
                            <span className='text-slate-500'>{commenter?.email} 📧</span>
                        </div>
                        <span className='text-sm text-slate-500'>{date} - {time}🕛</span>
                    </div>
                    <div>
                        <p>{comment?.content}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='text-[#0B7AF5] font-semibold select-none cursor-pointer'>Reply</span>
                        <div className='flex gap-3'>
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={() => updateLikeNDislike(comment, index, "like")}
                                className='flex flex-col items-center cursor-pointer'>
                                <BiLike
                                    color='#0B7AF5'
                                    size={20}
                                ></BiLike>
                                <span className='text-xs select-none text-[#0B7AF5]'>{like}</span>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={() => updateLikeNDislike(comment, index, "dislike")}
                                className='flex flex-col items-center cursor-pointer'>
                                <BiDislike
                                    color='#d50000'
                                    size={20}></BiDislike>
                                <span className='text-xs select-none text-[#d50000]'>{dislike}</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Scroll >
        )
    })
    const scrollToTop = () => {
        cmtRef?.current?.scrollIntoView(
            {
                block: "center",
                behavior: 'smooth'
            })
    }
    const handleSendComment = () => {
        if (commentInput) {
            // Add a message to exist channel comment in firestore
            const checkExist = comments?.length > 0 ? true : false;
            const data = {
                commenter: {
                    name: user.name,
                    email: user.email,
                    imageUrl: user.imageUrl
                },
                content: commentInput,
                createdAt: Timestamp.now(),
                like: 0,
                dislike: 0,
                reply: [],
            }
            commentService.addComment(props.productId, data, checkExist)
            // commentService.addComment()
            scrollToTop();
        }
        setCommentInput('')
    }
    const handleEnter = (e) => {
        if (e.key === "Enter")
            handleSendComment()
    }
    // Get realtime comment
    useEffect(() => {
        const ref = doc(db, "comment", props.productId);
        const unsub = onSnapshot(ref, (doc) => {
            setComments(doc.data()?.comment.reverse())
        })
        return () => {
            unsub();
        }
    }, [db, props.productId])
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
            <div className='w-full max-h-72 flex flex-col gap-4 overflow-y-auto overflow-x-hidden'>
                {/* Comment */}
                <div ref={cmtRef}></div>
                {printListComments}
            </div>
            <span className={`p-input-icon-right w-full ${user?.email ? "block" : "hidden"}`}>
                {
                    user?.email ? (
                        <i className="pi pi-send cursor-pointer" onClick={handleSendComment} />
                    ) : (<></>)
                }
                <InputText
                    className={`w-full ${user?.email ? "block" : "hidden"}`}
                    value={commentInput} onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={handleEnter}
                    placeholder="Say something here..." />
            </span>
        </div>
    );
};

export default Comment;