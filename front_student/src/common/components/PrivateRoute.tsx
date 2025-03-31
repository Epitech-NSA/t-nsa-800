import React from "react";
import { Route, PathRouteProps, Navigate } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

interface PrivateRouteProps extends PathRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({
  children,
  ...rest
}: PrivateRouteProps): JSX.Element {
  const session = useSession();

  return (
    <Route
      {...rest}
      element={session.isAuthenticated ? children : <Navigate to="/login" />}
    />
  );
}
