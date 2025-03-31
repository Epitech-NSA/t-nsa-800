import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

interface PrivateComponentProps {
  children: React.ReactNode;
}

export const PrivateComponent: React.FC<PrivateComponentProps> = ({
  children,
}) => {
  const { isAuthenticated } = useSession();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
