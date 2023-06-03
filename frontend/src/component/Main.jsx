import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getRefresh, logoutAction } from "../action/userAction";
import Loading from "./Loading";
import sync from "../assets/sync.png";

const Main = () => {
  const dispatch = useDispatch();

  const { userInfo, loading } = useSelector((state) => state.userSignin);

  useEffect(() => {
    dispatch(getRefresh());
  }, []);

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className=" w-[100%] min-h-[100vh]  bg-slate-800">
      <div className="flex flex-row w-full bg-slate-800 h-10 justify-between items-center px-4">
        <Link className="text-white cursor-pointer" to="/">
          <img src={sync} alt="sync editor" className="h-full w-10" />
        </Link>
        <div className=" flex flex-row gap-5">
          {userInfo && (
            <div className="text-white rounded-xl p-1 bg-slate-400 h-fit hover:bg-slate-600 cursor-pointer ">
              {userInfo?.name.toUpperCase()}
            </div>
          )}
          {userInfo && (
            <div className="text-white cursor-pointer" onClick={logout}>
              Logout
            </div>
          )}
        </div>
      </div>
      {loading ? <Loading /> : <Outlet />}
    </div>
  );
};

export default Main;
