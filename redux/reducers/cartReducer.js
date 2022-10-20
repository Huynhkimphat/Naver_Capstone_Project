import * as Cart from "../types/cartType";

const initialState = {
  cart: {},
  status: "",
};

const caculateTotal = (productList) => {
  var total = 0;
  productList.forEach((product) => {
    total += product.total;
  });
  return total;
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Cart.SET_CART:
      return {
        cart: action.payload.data[0],
        status: state.status,
      };
    case Cart.DELETE_PRODUCT_IN_CART:
      const productListToDelete =
        state.cart?.productListDetail.map((value) =>
          Object.assign({}, value)
        ) || [];
      return {
        cart: {
          ...state.cart,
          productListDetail: productListToDelete.filter(
            (product) => product.productId !== action.payload.data
          ),
          total: caculateTotal(
            productListToDelete.filter(
              (product) => product.productId !== action.payload.data
            )
          ),
        },
        status: "",
      };
    case Cart.ADD_PRODUCT_TO_CART:
      const productInfo = action.payload.data;
      let isExist = 0;
      const productList =
        state.cart?.productListDetail.map((value) =>
          Object.assign({}, value)
        ) || [];
      const total = state.cart.total;
      productList.forEach((item) => {
        if (item.productId === productInfo.productId) {
          item.amount = item.amount + productInfo.amount;
          item.total = item.total + productInfo.total;
          isExist = 1;
        }
      });
      !isExist && productList.push(productInfo);
      total += Number(productInfo.total);
      return {
        cart: {
          ...state.cart,
          productListDetail: productList,
          total: total,
        },
        status: state.status,
      };
    case Cart.UPDATE_PRODUCT_IN_CART:
      const productListToUpdate =
        state.cart?.productListDetail.map((value) =>
          Object.assign({}, value)
        ) || [];
      if (action.payload.data.type === "minus") {
        productListToUpdate.forEach((product) => {
          if (product.productId === action.payload.data.productId) {
            product.amount = product.amount - 1;
            product.total = product.amount * action.payload.data.price;
          }
        });
        return {
          cart: {
            ...state.cart,
            productListDetail: productListToUpdate,
            total: caculateTotal(productListToUpdate),
          },
          status: state.status,
        };
      }
      if (action.payload.data.type === "plus") {
        productListToUpdate.forEach((product) => {
          if (product.productId === action.payload.data.productId) {
            product.amount = product.amount + 1;
            product.total = product.amount * action.payload.data.price;
          }
        });
        return {
          cart: {
            ...state.cart,
            productListDetail: productListToUpdate,
            total: caculateTotal(productListToUpdate),
          },
          status: state.status,
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
