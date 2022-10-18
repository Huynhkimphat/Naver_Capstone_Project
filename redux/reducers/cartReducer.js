import * as Cart from "../types/cartType";

const initialState = {
  cart: {},
  status: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Cart.SET_CART:
      return {
        cart: action.payload.data[0],
        status: state.status,
      };
    case Cart.ADD_PRODUCT_TO_CART:
      const productInfo = action.payload.data;
      let isExist = 0;
      const productList = state.cart?.productListDetail.map(value => Object.assign({}, value)) || []; 
      const total =state.cart.total;
      productList.forEach((item) => {
        if (item.productId === productInfo.productId) {
          item.amount = item.amount + productInfo.amount;
          item.total = item.total + productInfo.total;
          isExist = 1;
        }
      });
      !isExist && productList.push(productInfo);
      total+=Number(productInfo.total);
      return {
        cart: {
          ...state.cart,
          productListDetail: productList,
          total:total,
        },
        status: state.status,
      };
    default:
      return state;
  }
};

export default cartReducer;
