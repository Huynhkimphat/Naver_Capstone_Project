const AppSelector = {
  getUserEmail: (state) => state.rootReducer.user.email,
  getUser: (state) => state.rootReducer.user.user,
};
export default AppSelector;
