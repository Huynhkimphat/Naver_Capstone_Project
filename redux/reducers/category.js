import * as Category from '../types/category'
import categoryService from '../../services/api/categoryService';


const initialState = {
    categories:  [],
    status: ''
};

const categoryReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case Category.SET_CATEGORY:
            return {
                categories: [...action.payload.data],
                status: state.status
            };
        default:
            return state;
    }
};

export default categoryReducer;