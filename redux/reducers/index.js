import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import productsReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import storage from "redux-persist/lib/storage";
import orderReducer from "./orderReducer";
import chatReducer from "./chatReducer";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  product: productsReducer,
  user: userReducer,
  category: categoryReducer,
  order: orderReducer,
  cart: cartReducer,
  chat: chatReducer,
  //any Reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
