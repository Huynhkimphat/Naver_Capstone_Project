import * as Types from "../types/products"

const onGetProductsList = list => (
    {
        type: Types.GET_PRODUCTS_LIST,
        payload: { list }
    }
)
const onUpdateProductStatus = status => ({
    type: Types.UPDATE_STATUS,
    payload: { status }
});

export { onGetProductsList, onUpdateProductStatus };