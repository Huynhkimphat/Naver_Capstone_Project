import * as Types from "../types/productType";

const setProductList = (data) => ({
  type: Types.GET_PRODUCTS_LIST,
  payload: { data },
});

const setProductDetail = (data) => ({
  type: Types.GET_PRODUCT_ID,
  payload: { data },
});

export { setProductList,setProductDetail };
