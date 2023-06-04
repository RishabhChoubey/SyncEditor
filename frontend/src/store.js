import { userResReducer, userSigReducer } from "./reducer/userReducer";

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

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
