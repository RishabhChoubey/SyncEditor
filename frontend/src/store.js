import {
  userResReducer,
  userSigReducer,
  userForgetReducer,
  tokenVerifyReducer,
  updatePasswordReducer,
} from "./reducer/userReducer";
// import {
//   postListReducer,
//   postCreateReducer,
//   postDeleteReducer,
//   postDetailReducer,
//   postReviewReducer,
//   removeReviewReducer,
//   postLikeReducer,
//   postUnlikeReducer,
// } from "./reducer/postReducer";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const initialState = {};

const reducer = combineReducers({
  userRegistration: userResReducer,
  userSignin: userSigReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
