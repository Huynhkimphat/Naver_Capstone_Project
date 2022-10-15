import * as Types from './../types/orderType'

const chooseOrder = (data) => ({
    type: Types.CHOOSE_ORDER,
    payload: { data },
});

const updateStatus = (data) => ({
    type: Types.UPDATE_STATUS,
    payload: { data }
})

const getOrders = (data) => ({
    type: Types.GET_ORDERS,
    payload: { data }
})
export { chooseOrder, updateStatus, getOrders };