import * as Types from "../types/cartType";

const setCart = (data) => ({
  type: Types.SET_CART,
  payload: { data },
});

const addProductToCart = (data) => ({
  type: Types.ADD_PRODUCT_TO_CART,
  payload: { data },
});

const updateProductInCart = (data) => ({
  type: Types.UPDATE_PRODUCT_IN_CART,
  payload: { data },
});
const deleteProductInCart = (data) => ({
  type: Types.DELETE_PRODUCT_IN_CART,
  payload: {data},
});

export { setCart, addProductToCart, updateProductInCart, deleteProductInCart };
