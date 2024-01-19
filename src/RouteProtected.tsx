// RouteProtected.js

import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import { Root } from "./pages/root/Root";

const RouteProtected = () => {
  const { userLogin } = React.useContext(AuthContext);

  return userLogin !== "" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RouteProtected;
