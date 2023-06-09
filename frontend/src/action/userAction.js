import axios from "axios";

import Cookie from "js-cookie";
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

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });

  try {
    const { data } = await api.post(`/api/signin`, {
      email,
      password,
    });

    if (data.err) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: data.msg });
    } else {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.msg });
    }
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: { msg: "Try Again Later" } });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await api.post(`/api/register`, {
      name,
      email,
      password,
    });

    if (data.err) {
      dispatch({ type: USER_REGISTER_FAIL, payload: data.msg });
    } else {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data.msg });
    }
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: data.msg });
  }
};
const getRefresh = () => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  const { data } = await api.get("/api/refresh");
  if (data.err) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: data.msg });
  } else {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.msg });
  }
};

const logoutAction = () => async (dispatch) => {
  await api.get("/api/logout");

  dispatch({ type: USER_LOGOUT });
};

const unsuccess = () => (dispatch) => {
  dispatch({ type: UNSUCCESS });
};

const resetState = () => (dispatch) => {
  dispatch({ type: RESET });
};

const resetPass = (email) => async (dispatch) => {
  dispatch({ type: USER_FORGET_REQUEST });
  const { data } = await axios.post("/api/users/forget", {
    email,
  });
  if (data.err) {
    dispatch({ type: USER_FORGET_FAIL });
  } else {
    dispatch({ type: USER_FORGET_SUCCESS });
  }
};

// const resetForget = () => async (dispatch) => {
//   dispatch({ type: "RESET_FORGET" });
// };

// const tokenVerify = (token) => async (dispatch) => {
//   dispatch({ type: USER_TOKEN_VERIFY_REQUEST });
//   const { data } = await axios.get("/api/users/verify/" + token);
//   if (data.err) {
//     dispatch({ type: USER_TOKEN_VERIFY_FAIL });
//   } else {
//     dispatch({ type: USER_TOKEN_VERIFY_SUCCESS });
//   }
// };

// const updatePassword = (pass) => async (dispatch) => {
//   dispatch({ type: USER_UPDATE_REQUEST });
//   const { data } = await axios.put("/api/users/updatePass", {
//     pass,
//   });
//   if (data.err) {
//     dispatch({ type: USER_UPDATE_FAIL });
//   } else {
//     dispatch({ type: USER_UPDATE_SUCCESS });
//   }
// };

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.config.url === "/api/isready") {
      try {
        return api.request(originalRequest);
      } catch (err) {}
    }
    throw error;
  }
);

export {
  signin,
  register,
  logoutAction,
  unsuccess,
  resetPass,
  resetState,
  getRefresh,
  api,
};
