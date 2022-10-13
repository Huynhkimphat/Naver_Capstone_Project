import * as Types from "../types/productType";

const setProductList = (data) => ({
  type: Types.GET_PRODUCTS_LIST,
  payload: { data },
});

export { setProductList };
