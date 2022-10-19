import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";


const chatService = {
    async getAllMessagesById(userId) {
        const ref = doc(db, "chat", userId)
        const msg = await getDoc(ref)
        return { ...msg.data() };
    },
    async updateMessageById(userId, msg) {
        const ref = doc(db, "chat", userId);
        await updateDoc(
            ref,
            {
                messages: arrayUnion(msg)
            }
        )
    },
    async setMessageByID(userId, msg) {
        const ref = doc(db, "chat", userId);
        await setDoc(
            ref,
            {
                messages: [msg]
            }
        )
    }
}

export default chatService;