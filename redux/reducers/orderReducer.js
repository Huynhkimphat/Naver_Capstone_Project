import * as Types from '../types/orderType'

const initialState = {
    data: {
        code: "",
        customerId:"",
        date: "",
        totalPrice: -1,
        status: "",
        productListDetail: []
    },
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHOOSE_ORDER:
            return {
                data: action.payload.data,
            }
        case Types.UPDATE_STATUS:
            return {
                data: {
                    ...state.data,
                    status: action.payload.data
                }
            }
        default:
            return state
    }
}

export default orderReducer;