import * as User from "../types/userType";

const initialState = {
  user: {},
  email: "",
  status: "",
  selectedUser: {},
  userListener: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case User.SET_USER_EMAIL:
      return {
        user: state.user,
        status: state.status,
        email: action.payload.data,
        userListener: state.userListener,
        selectedUser: state.selectedUser,
      };
    case User.SET_USER:
      return {
        user: action.payload.data,
        status: state.status,
        email: state.email,
        userListener: state.userListener,
        selectedUser: state.selectedUser,
      };
    case User.RESET_USER:
      return {
        user: [],
        status: "",
        email: "",
        userListener: state.userListener,
        selectedUser: {},
      };
    case User.CHOOSE_USER:
      return {
        user: state.user,
        status: state.status,
        email: state.email,
        userListener: state.userListener,
        selectedUser: action.payload.data,
      }
    case User.LISTEN_USER:
      return {
        user: state.user,
        status: state.status,
        email: state.email,
        userListener: action.payload.data,
        selectedUser: state.selectedUser,
      }
    default:
      return state;
  }
};

export default userReducer;
