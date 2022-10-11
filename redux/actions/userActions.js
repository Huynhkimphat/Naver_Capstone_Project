import * as Types from "../types/userType";

const setUserEmail = (data) => ({
  type: Types.SET_USER_EMAIL,
  payload: { data },
});
const setUser = (data) => ({
  type: Types.SET_USER,
  payload: { data },
});
const resetUser = () => ({
  type: Types.RESET_USER,
  payload: {},
});
export { setUserEmail, setUser, resetUser };
