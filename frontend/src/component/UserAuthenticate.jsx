import React, { useState, useEffect, useHistory, memo } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import "./auth.css";
import { signin, register, resetState } from "../action/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const UserAuthenticate = () => {
  console.log("  inside auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  ///////////////////// Selector
  const dataSignIn = useSelector((state) => state.userSignin);
  const dataReg = useSelector((state) => state.userRegistration);

  ///////////////////// USE STATES
  const [active, setactive] = useState(0);
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  ////////////////////////////////////////////////////////////////////
  console.log(dataSignIn);
  console.log(dataReg);

  ////////////////////////// change form
  const switchToRegister = () => {
    console.log("register");
    reset();
    setactive(1);
  };
  const switchToLogin = () => {
    reset();
    setactive(0);
  };

  ///////////////////////// reset fields

  const reset = () => {
    dispatch(resetState());
    setEmail("");
    setuserName("");
    setPassword("");
    setRepeatPassword("");
  };
  ////////////////////////// login//////////////////

  const loginBtn = () => {
    if (email == "" && password == "") return;
    dispatch(signin(email, password));
  };

  ////////////////////////// Register//////////////////////
  const registerBtn = () => {
    if (email == "" && password == "" && userName == "" && repeatPassword == "")
      return;
    if (password != repeatPassword) return;

    dispatch(register(userName, email, password));
  };

  useEffect(() => {
    if (dataReg.success) {
      reset();
      setactive(0);
    }
    if (dataSignIn.success) {
      return navigate("/");
    }
  }, [dataReg, dataSignIn]);

  if (dataSignIn && dataSignIn.loading) <Loading />;

  return (
    <div className="main w-[100%] h-[calc(100vh-2.5rem)]  flex flex-col justify-center items-center">
      <span className="#form p-2 overflow-hidden relative lg:w-[80%]  lg:h-[80%] w-[100%] h-[100%] bg-slate-400 lg:rounded-3xl flex lg:flex-row flex-col">
        <div className="relative sign  lg:w-[50%] h-[calc(50%-.25rem)] w-[100%] lg:h-[100%]  justify-center items-center flex flex-col">
          <div
            className={`${
              active == 0
                ? "border-2 border-black lg:left-0 top-0 rounded-xl z-10"
                : "lg:left-[-150%] top-[-150%] lg:top-0"
            } auth_sec`}
          >
            {!dataSignIn.loading ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="email"
                  className="input  rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div> {dataSignIn?.error?.email}</div>
                <input
                  type="password"
                  placeholder="password"
                  className="input rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div> {dataSignIn?.error?.msg}</div>
                <button
                  className={"auth_button cursor-pointer rounded-xl"}
                  onClick={loginBtn}
                >
                  Signin
                </button>
              </>
            ) : (
              <div>loading...</div>
            )}
          </div>

          <div
            className="signBtn cursor-pointer font-bold"
            onClick={switchToLogin}
          >
            {" "}
            Signin Form
          </div>
        </div>
        <div className=" relative register h-[calc(50%-.25rem)] w-[100%] lg:w-[50%]  lg:h-[100%]  justify-center items-center flex flex-col ">
          <div
            className={`${
              active == 1
                ? "border-2 border-black right-0 rounded-xl z-10"
                : "right-[-150%]"
            } auth_sec`}
          >
            {!dataReg.loading ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="username"
                  className="input  rounded-md"
                  onChange={(e) => setuserName(e.target.value)}
                  value={userName}
                />
                <div> {dataReg?.error?.user}</div>
                <input
                  type="text"
                  placeholder="email"
                  className="input  rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div> {dataReg?.error?.email}</div>
                <input
                  type="password"
                  placeholder="password"
                  className="input  rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div> {dataReg?.error?.password}</div>
                <input
                  type="password"
                  placeholder="re-enter password"
                  className="input  rounded-md"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button
                  className={"auth_button cursor-pointer rounded-xl"}
                  onClick={registerBtn}
                >
                  Register
                </button>
              </>
            ) : (
              <div>loading...</div>
            )}
          </div>
          <div
            className="regisBtn cursor-pointer font-bold"
            onClick={switchToRegister}
          >
            Registration Form
          </div>
        </div>
      </span>
    </div>
  );
};

export default memo(UserAuthenticate);
