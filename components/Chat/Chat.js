import React, { useEffect, useRef, useState } from 'react';
import { SiLivechat } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import nookies from 'nookies'
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import chatService from '../../services/api/admin/chatService';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import userService from '../../services/api/userService';
import Scroll from '../Admin/Animation/Scroll'
import { chatNotification } from '../../redux/actions/chatAction';

const styles = {
    popupContainer: "fixed right-8 bottom-8 z-50",
    chatForm: "absolute transition duration-1000 flex flex-col justify-between bottom-4 sm:bottom-0 right-2 w-[300px] h-[85vh] sm:h-[300px] bg-white rounded-xl shadow-2xl",
    header: 'w-full h-[10%] sm:h-[14%] bg-admin_color px-3 sm:px-2 flex items-center rounded-xl justify-between',
    headerRow: 'w-[80%] flex items-center text-white gap-3 sm:gap-2',
    bodyChat: 'w-full h-[80%] sm:h-[72%] px-3 py-1 sm:px-2 flex flex-col overflow-y-scroll gap-2 shadow-lg overflow-x-hidden',
    inputChat: 'w-full h-[10%] sm:h-[14%] flex justify-between shadow-xl rounded-b-md',
    inputText: ' w-full rounded-b-lg px-2',
    btnSend: 'w-[10%] flex justify-center',
    popup: "flex gap-3 justify-cente items-center bg-admin_color p-4 rounded-full cursor-pointer select-none shadow-lg shadow-indigo-500/40",
    textPop: 'text-white font-semibold',
    msgContainer: "flex w-full px-2",
    msg: "max-w-[60%] text-white",
    msgLeft: "justify-start",
    msgRight: "justify-end",
    paragraph: "py-1 px-2 rounded-md break-words"
}

const Chat = () => {
    const user = useSelector(state => state.rootReducer.user.user)
    const notification = useSelector(state => state.rootReducer.chat.data)
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [togglePopup, setTogglePopup] = useState(false);
    const [imageList, setImageList] = useState([]);
    // Scroll to last message
    const msgRef = useRef(null);
    // Input
    const [inputMsg, setInputMsg] = useState('');
    const [messages, setMessages] = useState([]);
    // const [timeFLag, setTimeFlag] = useState('');
    let timeFlag = "";
    let checkTime = false;
    let today = new Date().toDateString();
    useEffect(() => {
        const cookies = nookies.get()["token"];
        setToken(cookies);
        // Fetch conversation
        chatService.getAllMessagesById(user?.email == undefined ? "none" : user?.email)
            .then(res => {
                if (res.messages == undefined && user.email != undefined) {
                    const welcomeMsg = `Xin chào ${user?.name} 👋, cảm ơn bạn đã quan tâm đến các sản phẩm của Avion, xin hãy đợi trong giây lát để kết nối đến Admin tư vấn 😊😊.`
                    chatService.setMessageByID(user?.email, {
                        content: welcomeMsg,
                        sender: "admin@gmail.com",
                        createdOn: Timestamp.now(),
                    })
                }
                setMessages(res.messages)
            })
    }, [user])
    useEffect(() => {
        const userId = user?.email == undefined ? "none" : user?.email;
        const ref = doc(db, "chat", userId)
        const unsub = onSnapshot(ref, (doc) => {
            let flag = 0;
            if (userId != "none") {
                const m = doc.data();
                setMessages(m?.messages)
                scrollToBottom()
            }
        })
        return () => {
            unsub();
        }
    }, [db, user])
    useEffect(() => {
        scrollToBottom()
    }, [messages, togglePopup])
    const handleSend = () => {
        if (inputMsg && messages?.length > 0) {
            chatService.updateMessageById(user?.email, {
                content: inputMsg,
                sender: user?.email,
                createdOn: Timestamp.now(),
            })
            userService.updateUser({
                ...user,
                lastMessage: Timestamp.now()
            })
            setInputMsg('');
        } else {
            if (inputMsg) {
                chatService.setMessageByID(user?.email, {
                    content: inputMsg,
                    sender: user?.email,
                    createdOn: Timestamp.now(),
                })
                userService.updateUser({
                    ...user,
                    lastMessage: Timestamp.now()
                })
                setInputMsg('');
            }
        }
    }
    const handleEnter = (e) => {
        if (e.key === "Enter")
            handleSend()
    }
    const scrollToBottom = () => {
        msgRef.current?.scrollIntoView(
            {
                block: "end",
                behavior: 'smooth'
            })
    }
    const printMessages = messages?.map((msg, index) => {
        const time = msg.createdOn.toDate();
        // console.log(time.toDateString());
        // console.log(time.toLocaleTimeString([], {timeStyle: 'short'}));
        const date = time.toDateString();
        const msgTime = time.toLocaleTimeString([], { timeStyle: 'short' });
        const isToday = today === date ? true : false;
        checkTime = timeFlag != date ? true : false;
        timeFlag = checkTime ? date : timeFlag;
        return (
            <Scroll loop={"all"} key={index} scroll={user?.email == msg?.sender ? "translateX(-400px)" : "translateX(400px)"}>
                <div className={`w-full flex justify-center border-b-2 border-admin_color text-center my-4 ${checkTime ? "block" : "hidden"}`}>
                    <h1 className='text-xs text-white bg-admin_color px-2 py-1 rounded-t-lg'>{isToday ? "Today" : date}</h1>
                </div>
                <div key={index} className={`${styles.msgContainer} ${user?.email == msg?.sender ? styles.msgRight : styles.msgLeft}`}>
                    <div className={styles.msg}>
                        <motion.p
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className={` ${styles.paragraph} ${user?.email == msg?.sender ? "bg-admin_second_color" : "bg-slate-500"}`}>
                            {msg?.content}
                        </motion.p>
                        <span className='text-slate-500 text-sm'>{msgTime}</span>
                    </div>
                </div>
                {/* <div className={`flex w-full px-2 my-4 ${user?.email == msg?.sender ? styles.msgRight : styles.msgLeft}`}>
                    <div className='w-1/2'>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className='w-full flex flex-col bg-transparent shadow-xl'>
                            <Image src={user?.imageUrl} className="rounded-2xl shadow-2xl" alt="" height={100} width={100}></Image>
                        </motion.div>
                        <span className='text-slate-500 text-sm'>{msgTime}</span>
                    </div>
                </div> */}
            </Scroll>
        )
    })
    return (
        <div className={`${styles.popupContainer} ${(!token) ? "hidden" : "block"}`}>
            {
                togglePopup ? (
                    // Form chat
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={styles.chatForm}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerRow}>
                                <Image
                                    className='rounded-xl'
                                    src={user?.imageUrl}
                                    alt=""
                                    width={30}
                                    height={30}></Image>
                                <span className='font-semibold'>{user?.name}</span>
                            </div>
                            <IoMdClose
                                size={20}
                                color="white"
                                className='cursor-pointer'
                                onClick={() => {
                                    dispatch(chatNotification(false))
                                    setTogglePopup(false)
                                }}
                            ></IoMdClose>
                        </div>
                        {/* Body */}
                        <div className={styles.bodyChat}>
                            {/* Message */}
                            {printMessages}
                            <div ref={msgRef}></div>
                        </div>
                        {/* Input Messages */}
                        <span className="p-input-icon-right w-full">
                            <i className='flex gap-4'>
                                <motion.i
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="pi pi-paperclip cursor-pointer"
                                    // onClick={() => {}}
                                     />
                                <motion.i
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="pi pi-send cursor-pointer"
                                    onClick={handleSend} />
                            </i>
                            <InputText
                                className={styles.inputText}
                                placeholder='Type your message'
                                value={inputMsg}
                                onChange={(e) => setInputMsg(e.target.value)}
                                onKeyDown={handleEnter}
                            >
                            </InputText>
                        </span>
                        {/* <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Button
                                    aria-label="Discord"
                                    className={styles.btnSend}
                                    onClick={handleSend}
                                >
                                    <i className="pi pi-send"></i>
                                </Button>
                            </motion.div> */}


                    </motion.div>
                ) : (
                    // Button Icon
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={`${styles.popup} ${togglePopup ? "hidden" : "block"} ${notification ? "animate-bounce" : "animate-bounce-slow"}`}
                        onClick={() => {
                            dispatch(chatNotification(false))
                            setTogglePopup(true)
                        }}>
                        <div class={`flex h-8 w-8 justify-center items-center absolute -top-3 right-0 ${notification ? "" : "hidden"}`}>
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffab00] opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-4 w-4 bg-[#ffd600]"></span>
                        </div>
                        <span className={styles.textPop}>{notification ? "New message" : "Chat with us"}</span>
                        <SiLivechat color='white' size={25}></SiLivechat>
                    </motion.div>
                )
            }
        </div>
    );
};

export default Chat;