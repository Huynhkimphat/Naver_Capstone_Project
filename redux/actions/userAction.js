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
const chooseUser = (data) => ({
  type: Types.CHOOSE_USER,
  payload: { data }
})
// For realtime chat
const onListenUser = (data) => ({
  type: Types.LISTEN_USER,
  payload: { data }
})
export { setUserEmail, setUser, resetUser, chooseUser, onListenUser };
