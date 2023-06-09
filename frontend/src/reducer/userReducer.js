import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_FORGET_REQUEST,
  USER_FORGET_SUCCESS,
  USER_FORGET_FAIL,
  USER_TOKEN_VERIFY_REQUEST,
  USER_TOKEN_VERIFY_SUCCESS,
  USER_TOKEN_VERIFY_FAIL,
  UNSUCCESS,
  RESET,
} from "../constant/userConstant";
import Cookie from "js-cookie";

function userSigReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true, success: false };
    case USER_SIGNIN_SUCCESS:
      return { userInfo: action.payload, success: true, loading: false };
    case USER_SIGNIN_FAIL:
      return { error: action.payload, success: false, loading: false };
    case USER_LOGOUT:
      return { ...state, userInfo: null, success: false };
    case UNSUCCESS:
      return { userInfo: null, loading: false };
    case RESET:
      return { userInfo: null, loading: false };

    default:
      return state;
  }
}
function userResReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, success: false };
    case USER_REGISTER_SUCCESS:
      return { success: true, loading: false };
    case USER_REGISTER_FAIL:
      return { error: action.payload, success: false, loading: false };
    case RESET:
      return {};
    default:
      return state;
  }
}

// const userForgetReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_FORGET_REQUEST:
//       return { loading: true, success: false };
//     case USER_FORGET_SUCCESS:
//       return { loading: false, data: "Email send to Email id", success: true };
//     case USER_FORGET_FAIL:
//       return { loading: false, error: "Invalide Email Id", success: false };
//     case "RESET_FORGET":
//       return {};
//     default:
//       return state;
//   }
// };
// const tokenVerifyReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_TOKEN_VERIFY_REQUEST:
//       return { loading: true, success: false };
//     case USER_TOKEN_VERIFY_SUCCESS:
//       return { loading: false, data: " success ", success: true };
//     case USER_TOKEN_VERIFY_FAIL:
//       return {
//         loading: false,
//         error: "Try again forget password token expire ",
//         success: false,
//       };
//     case "RESET_TOKEN":
//       return {};
//     default:
//       return state;
//   }
// };

// const updatePasswordReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_UPDATE_REQUEST:
//       return { loading: true, success: false };
//     case USER_UPDATE_SUCCESS:
//       return { loading: false, data: " success ", success: true };
//     case USER_UPDATE_FAIL:
//       return {
//         loading: false,
//         error: " error updating ",
//         success: false,
//       };
//     case "RESET_TOKEN":
//       return {};
//     default:
//       return state;
//   }
// };

export { userResReducer, userSigReducer };
