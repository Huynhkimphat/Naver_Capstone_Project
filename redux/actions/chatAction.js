import * as Types from "../types/chatType"

const adminSend = (data) => ({
    type: Types.ADMIN_SEND,
    payload: { data },
});
const chatNotification = (data) => ({
    type: Types.CHAT_NOTIFICATION,
    payload: { data },
});
export { adminSend, chatNotification };