import * as User from "../types/userType";

const initialState = {
  user: {},
  email: "",
  status: "",
  selectedUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case User.SET_USER_EMAIL:
      return {
        user: state.user,
        status: state.status,
        email: action.payload.data,
        selectedUser: state.selectedUser,
      };
    case User.SET_USER:
      return {
        user: action.payload.data,
        status: state.status,
        email: state.email,
        selectedUser: state.selectedUser,
      };
    case User.RESET_USER:
      return {
        user: [],
        status: "",
        email: "",
        selectedUser: {},
      };
    case User.CHOOSE_USER:
      return {
        user: state.user,
        status: state.status,
        email: state.email,
        selectedUser: action.payload.data,
      }
    default:
      return state;
  }
};

export default userReducer;
