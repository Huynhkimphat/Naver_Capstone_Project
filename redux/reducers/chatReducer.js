import * as Types from '../types/chatType'

const initialState = {
    data: true
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHAT_NOTIFICATION:
            return {
                data: action.payload.data,
            };
        default:
            return state;
    }
}

export default chatReducer;