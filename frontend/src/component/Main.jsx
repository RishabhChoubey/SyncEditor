import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutAction } from "../action/userAction";

const Main = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { userInfo,loading } = useSelector((state) => state.userSignin);
  console.log(userInfo +"   Main  "+loading);
  

  useEffect(() => {
    if(loading===true || loading === undefined)  return
    if (userInfo == null || userInfo == undefined) naviagte("/");
  }, [userInfo,loading]);
  const logout = () => {
    dispatch(logoutAction());
  };
  return (
    <div className=" w-[100%] min-h-[100vh] bg-black">
      <div className="flex flex-row w-full bg-slate-800 h-10 justify-between items-center px-4">
        <Link className="text-white cursor-pointer" to="/create">
          logo
        </Link>
        <div className=" flex flex-row gap-5">
          {userInfo && (
            <div className="text-white rounded-xl p-1 bg-slate-400 h-fit hover:bg-slate-600">
              {userInfo?.name.toUpperCase()}
            </div>
          )}
          <div className="text-white cursor-pointer" onClick={logout}>
            Logout
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
