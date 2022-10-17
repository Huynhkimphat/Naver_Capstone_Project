import * as Products from "../types/productType";

const initialState = {
  products: [],
  status: "",
  productId : {}
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
      case Products.GET_PRODUCT_ID:
        return {
          products: [...state.products],
          productId: action.payload.data,
          status: state.status,
        };
    default:
      return state;
  }
};

export default productsReducer;
