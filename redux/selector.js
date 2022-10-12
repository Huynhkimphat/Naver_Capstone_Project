const AppSelector = {
    getUserEmail: (state) => state?.rootReducer?.user?.email,
    getUser: (state) => state.rootReducer.user.user,
    getCategory: (state) => state.rootReducer.category.category,
    getUserImageUrl: (state) => state.rootReducer.user.user.imageUrl,
};
export default AppSelector;
