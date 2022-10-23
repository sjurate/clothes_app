import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../Functions/auth";

function LogoutPage({ setRoleChange }) {
  useEffect(() => {
    logout();
    setRoleChange(Date.now());
  }, [setRoleChange]);

  return <Navigate to="/login" replace />;
}

export default LogoutPage;
