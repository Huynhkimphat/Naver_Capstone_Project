import * as Types from "../types/cartType";

const setCart = (data) => ({
    type: Types.SET_CART,
    payload: { data },
});

export { setCart };
