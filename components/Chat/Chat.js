import React, { useEffect, useRef, useState } from 'react';
import { SiLivechat } from 'react-icons/si';
import { useSelector } from 'react-redux';
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

const styles = {
    popupContainer: "fixed right-8 bottom-8 z-50",
    chatForm: "absolute transition duration-1000 flex flex-col justify-between bottom-4 sm:bottom-0 right-2 w-[300px] h-[85vh] sm:h-[300px] bg-white rounded-xl shadow-2xl",
    header: 'w-full h-[10%] sm:h-[14%] bg-admin_color px-3 sm:px-2 flex items-center rounded-xl justify-between',
    headerRow: 'w-[80%] flex items-center text-white gap-3 sm:gap-2',
    bodyChat: 'w-full h-[80%] sm:h-[72%] px-3 py-1 sm:px-2 flex flex-col overflow-y-scroll gap-2 shadow-lg',
    inputChat: 'w-full h-[10%] sm:h-[14%] flex justify-between shadow-xl rounded-b-md',
    inputText: ' w-[90%] rounded-b-lg px-2',
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
    const [token, setToken] = useState('');
    const [togglePopup, setTogglePopup] = useState(false);
    // Scroll to last message
    const msgRef = useRef(null);
    // Input
    const [inputMsg, setInputMsg] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const cookies = nookies.get()["token"];
        setToken(cookies)
        // Fetch conversation
        chatService.getAllMessagesById(user?.email==undefined ? "none" : user?.email)
        .then(res => {
            setMessages(res.messages)})
    }, [user])
    useEffect(() => {
        const userId = user?.email==undefined ? "none" : user?.email;
        const ref = doc(db, "chat", userId)
        const unsub = onSnapshot(ref, (doc) => {
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
        } else {
            if (inputMsg) {
                chatService.setMessageByID(user?.email, {
                    content: inputMsg,
                    sender: user?.email,
                    createdOn: Timestamp.now(),
                })
            }
        }
        setInputMsg('');
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
        return (
            <div key={index} className={`${styles.msgContainer} ${user?.email == msg?.sender ? styles.msgRight : styles.msgLeft}`}>
                <div className={styles.msg}>
                    <p className={` ${styles.paragraph} ${user?.email == msg?.sender ? "bg-admin_second_color" : "bg-slate-500"}`}>{msg?.content}</p>
                    <span className='text-slate-500'>9:30 PM</span>
                </div>
            </div>

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
                                onClick={() => setTogglePopup(false)}
                            ></IoMdClose>
                        </div>
                        {/* Body */}
                        <div className={styles.bodyChat}>
                            {/* Message */}
                            {printMessages}
                            <div ref={msgRef}></div>
                        </div>
                        {/* Input Messages */}
                        <div className={styles.inputChat}>
                            <InputText
                                className={styles.inputText}
                                placeholder='Type your message'
                                value={inputMsg}
                                onChange={(e) => setInputMsg(e.target.value)}
                                onKeyDown={handleEnter}
                            >
                            </InputText>
                            <Button
                                aria-label="Discord"
                                className={styles.btnSend}
                                onClick={handleSend}
                            >
                                <i className="pi pi-send"></i>
                            </Button>
                        </div>

                    </motion.div>
                ) : (
                    // Button Icon
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={`${styles.popup} ${togglePopup ? "hidden" : "block"}`}
                        onClick={() => setTogglePopup(true)}>
                        <span className={styles.textPop}>Chat with us</span>
                        <SiLivechat color='white' size={25}></SiLivechat>
                    </motion.div>
                )
            }
        </div>
    );
};

export default Chat;