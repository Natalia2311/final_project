
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;  // Redirect to home page or login page
  }

  return children;
};

export default ProtectedRoute;