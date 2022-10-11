import * as User from "../types/userType";

const initialState = {
  user: {},
  email: "",
  status: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case User.SET_USER_EMAIL:
      return {
        user: state.user,
        status: state.status,
        email: action.payload.data,
      };
    case User.SET_USER:
      return {
        user: action.payload.data,
        status: state.status,
        email: state.email,
      };
    case User.RESET_USER:
      return {
        user: [],
        status: "",
        email: "",
      };
    default:
      return state;
  }
};

export default userReducer;
