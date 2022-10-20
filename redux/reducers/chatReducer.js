import * as Types from '../types/chatType'

const initialState = {
    data: false
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADMIN_SEND:
            return {
                data: action.payload.data,
            };
        default:
            return state;
    }
}

export default chatReducer;