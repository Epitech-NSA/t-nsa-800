import React from "react";
import { useSession } from "../../contexts/SessionContext";
import { Navigate, RouteProps } from "react-router-dom";

export function PrivateComponent({ children }: RouteProps): any {
  const session = useSession();
  return session.isAuthenticated ? children : <Navigate to={"/login"} />;
}
