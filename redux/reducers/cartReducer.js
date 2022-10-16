import * as Cart from "../types/cartType";

const initialState = {
    cart:{},
    status: "",
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case Cart.SET_CART:
            return {
                cart: action.payload.data,
                status: state.status,
            };
        default:
            return state;
    }
};

export default cartReducer;
