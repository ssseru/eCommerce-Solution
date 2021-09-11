import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  ProductDetailsReducer,
  productListReducer,
} from "./reducers/productReducer";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const initialState = {
  //set userInfo to what stored in localStorage
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: ProductDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
