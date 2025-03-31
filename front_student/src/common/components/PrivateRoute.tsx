// PrivateRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({
  children,
  ...rest
}: PrivateRouteProps): JSX.Element {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
