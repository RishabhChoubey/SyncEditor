import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (Component) => {
  const { userInfo, loading } = useSelector((state) => state.userSignin);

  if (
    (loading == false || loading != undefined) &&
    (userInfo == null || userInfo == undefined)
  ) {
    console.log(!loading + "   protected redirect " + userInfo);
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
