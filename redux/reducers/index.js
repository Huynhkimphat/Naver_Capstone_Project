import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import productsReducer from "./products";
import categoryReducer from "./category";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  product: productsReducer,
  category:categoryReducer
  //any Reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
