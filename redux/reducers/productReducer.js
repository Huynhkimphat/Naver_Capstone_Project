import * as Products from "../types/productType";

const initialState = {
  products: [],
  status: "",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Products.GET_PRODUCTS_LIST:
      return {
        products: [...action.payload.data],
        status: state.status,
      };
    case Products.UPDATE_STATUS:
      let _status = action.payload.status;
      return {
        products: [...state.products],
        status: _status,
      };
    default:
      return state;
  }
};

export default productsReducer;
