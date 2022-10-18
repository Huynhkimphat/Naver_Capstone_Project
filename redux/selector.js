const AppSelector = {
  getUserEmail: (state) => state?.rootReducer?.user?.email,
  getUser: (state) => state.rootReducer.user.user,
  getCategory: (state) => state.rootReducer.category.category,
  getUserImageUrl: (state) => state.rootReducer.user.user.imageUrl,
  getProduct: (state) => state.rootReducer.product.products,
  getProductID: (state) => state.rootReducer.product.productId,
  getCart: (state) => state.rootReducer.cart.cart,
};
export default AppSelector;
