import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthRequired = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
};

export default AuthRequired;
