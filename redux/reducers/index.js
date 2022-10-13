import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import productsReducer from "./productReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  product: productsReducer,
  user: userReducer,
  category: categoryReducer,
  //any Reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
