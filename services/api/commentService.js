import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";


const commentService = {
    async addComment(productId, data, existChannel) {
        const q = doc(db, "comment", productId);
        if(existChannel)
            await updateDoc(q, {
                comment: arrayUnion(data)
            })
        else
            await setDoc(q, {
                comment: [data]
            })
    },
    async updateLikeNDisLike(productId, data) {
        const q = doc(db, "comment", productId);
        await updateDoc(q, {
            comment: data
        })
    },
    async addReply(productId, data) {
        const q = doc(db, "comment", productId);
        await updateDoc(q, {
            comment: data
        })
    }
}

export default commentService;