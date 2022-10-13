import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";


const updateField = { 
    // Update Field by ID - field
    async byId(id, field, value) {
        const orderRef = doc(db, "orders", id);
        await updateDoc(orderRef,
            {
                [field]: value
            }
        )
    }
}

export default updateField;