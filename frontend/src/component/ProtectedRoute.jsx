import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (Component) => {
  const { userInfo, loading } = useSelector((state) => state.userSignin);

  if (userInfo == null || userInfo == undefined) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
