import Image from 'next/image';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import userService from '../../../services/api/admin/userService';
import chatService from '../../../services/api/admin/chatService';
import { useSelector } from 'react-redux';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useInView } from 'framer-motion';
import { RiChatSmile2Fill } from 'react-icons/ri'
import EmojiPicker from 'emoji-picker-react';
import Hello from '../../../static/hello.png'
const styles = {
    wrapper: 'mx-auto w-full p-4 flex shadow-lg rounded-md gap-4',
    content: 'w-full h-[65vh] justify-between  flex gap-2',
    userContainer: 'w-[30%] h-[96%] p-2 bg-admin_color rounded-md overflow-y-scroll flex flex-col gap-2 scrollbar-hide',
    user: 'flex items-center justify-start gap-2 bg-white p-2 rounded-md cursor-pointer',
    messageContainer: ' overflow-y-auto flex w-[70%] h-full flex-col p-4 gap-2 justify-between',
    message: 'h-[85%] flex flex-col gap-4 pt-4 overflow-y-scroll px-2 border-2 border-admin_color rounded-md',
    inputContainer: 'h-[15%] relative flex justify-around items-center p-2 border-2 rounded-md',
    btnSend: "w-[10%] flex items-center justify-center",
    msg: 'w-full flex text-white',
    msgLeft: "justify-start",
    msgRight: "justify-end"
}
const Chat = () => {
    const user = useSelector(state => state.rootReducer.user.user)
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [chooseUser, setChooseUser] = useState({ email: 'none' });
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    const [emoji, setEmoji] = useState('')
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [hide, setHide] = useState(true)
    const msgRef = useRef(null)
    const isInView = useInView(msgRef);
    let timeFlag = "";
    let checkTime = false;
    let today = new Date().toDateString();
    const printUsers = users.map((user, index) => {
        return (
            <div key={user?.email} className={styles.user} onClick={() => setChooseUser(user)}>
                <Image className='rounded-md' src={user?.imageUrl} alt="" width={50} height={50}></Image>
                <span className='text-admin_color font-semibold'>{user?.name}</span>
            </div>
        )
    })
    const printMessages = messages?.map((message, index) => {
        const time = message?.createdOn.toDate();
        const date = time.toDateString();
        const msgTime = time.toLocaleTimeString([], { timeStyle: 'short' });
        const isToday = today === date ? true : false;
        checkTime = timeFlag != date ? true : false;
        timeFlag = checkTime ? date : timeFlag;
        return (
            <>
                <div className={`flex border-b-2 border-admin_color justify-center ${checkTime ? "block" : "hidden"}`}>
                    <h1 className='text-white bg-admin_color rounded-t-lg px-2'>{isToday ? "Today" : date}</h1>
                </div>
                <div key={index} className={`${styles.msg} ${message?.sender != user?.email ? styles.msgLeft : styles.msgRight} ${index == 0 ? "mt-auto" : ""}`}>
                    <div className={`max-w-[60%] flex flex-col flex-wrap`}>
                        <p className={`break-all p-2 rounded-md ${message?.sender == user?.email ? "bg-admin_second_color" : "bg-slate-400"}`}>{message?.content}</p>
                        <span className=' text-slate-400 text-sm'>{msgTime}</span>
                    </div>
                </div>
            </>
        )
    })
    const handleSend = () => {
        if (inputMsg && messages?.length > 0) {
            chatService.updateMessageById(chooseUser.email, {
                content: inputMsg,
                sender: user.email,
                createdOn: Timestamp.now()
            })
            setInputMsg('');
            scrollToBottom();
        }
        else {
            if (inputMsg) {
                chatService.setMessageByID(chooseUser.email, {
                    content: inputMsg,
                    sender: user.email,
                    createdOn: Timestamp.now()
                })
            }
        }
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }
    const scrollToBottom = () => {
        msgRef.current?.scrollIntoView(
            {
                block: "end",
                behavior: 'smooth'
            })
    }
    const onClickEmoji = (emojiData, event) => {
        setInputMsg(inputMsg + emojiData.unified)
    }
    useEffect(() => {
        userService.getAllUsers().then(res => setUsers(res))
    }, [])
    useEffect(() => {
        chatService.getAllMessagesById(chooseUser.email).then(res => {
            if (chooseUser.email == "none") {
                console.log("Set a user with empty array")
            }
            else {
                setHide(false)
                setMessages(res.messages)
            }
        })
        if (!isInView)
            scrollToBottom()
        setIsLoading(!isLoading)
    }, [chooseUser])
    useEffect(() => {

        const unsub = onSnapshot(doc(db, "chat", chooseUser.email), (doc) => {
            if (chooseUser.email != "none") {
                const m = doc.data();
                scrollToBottom();
                setMessages(m?.messages)
            }
        });
        scrollToBottom();
        return () => {
            unsub();
        }
    }, [db, chooseUser])

    useEffect(() => {
        scrollToBottom()
    }, [messages])
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.userContainer}>
                    {printUsers}
                </div>
                <div className={styles.messageContainer}>
                    <div className={`${styles.message} ${hide ? "items-center scrollbar-hide" : ""}`}>
                        {printMessages}
                        <div style={{ float: "left", clear: "both" }} id='last' ref={msgRef}></div>
                        <div className={`h-[70%] w-[50%] flex flex-col items-center gap-8 ${hide ? "block" : "hidden"}`}>
                            <h1 className='font-semibold text-admin_color text-2xl'>Say something</h1>
                            <Image src={Hello} alt=""></Image>
                        </div>
                    </div>
                    <div className={`${styles.inputContainer} ${hide ? "hidden" : "block"}`}>
                        {/* <div className={`absolute bottom-[110%] left-0 ${toggleEmoji ? 'block' : "hidden"}`}>
                            <EmojiPicker
                                width={250}
                                height={300}
                                onEmojiClick={onClickEmoji}
                            ></EmojiPicker>
                        </div> */}
                        <RiChatSmile2Fill
                            lassName='cursor-pointer' size={30}
                            color="#ffc400"
                        // onClick={() => setToggleEmoji(!toggleEmoji)}
                        />
                        {/* value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} */}
                        <InputText
                            className='w-[80%]'
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            onKeyDown={handleEnter}
                            required
                        ></InputText>
                        <Button
                            className={styles.btnSend}
                            aria-label="Discord"
                            onClick={handleSend}
                        >
                            <i className="pi pi-send px-2"></i>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;