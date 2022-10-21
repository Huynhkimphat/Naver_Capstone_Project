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
}

export default commentService;