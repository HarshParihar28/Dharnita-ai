import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
