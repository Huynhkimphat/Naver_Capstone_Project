import * as Types from "../types/chatType"

const adminSend = (data) => ({
    type: Types.ADMIN_SEND,
    payload: { data },
});

export { adminSend };