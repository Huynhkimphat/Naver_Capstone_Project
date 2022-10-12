import * as Category from "../types/categoryType";

const initialState = {
    category: [],
    status: "",
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case Category.SET_CATEGORY:
            return {
                category: action.payload.data,
                status: state.status,
            };
        default:
            return state;
    }
};

export default categoryReducer;
