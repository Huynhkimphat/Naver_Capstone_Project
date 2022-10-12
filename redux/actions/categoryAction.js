import * as Types from "../types/categoryType";

const setCategory = (data) => ({
    type: Types.SET_CATEGORY,
    payload: { data },
});

export { setCategory };
