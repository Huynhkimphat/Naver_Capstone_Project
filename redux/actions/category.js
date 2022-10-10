import * as Types from "../types/category"

const setCategories = data => (
    {
        type: Types.SET_CATEGORY,
        payload: { data }
    }
)

export { setCategories };