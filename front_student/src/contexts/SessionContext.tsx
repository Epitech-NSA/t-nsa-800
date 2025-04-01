import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface SessionContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  setSession: (sessionData: { token: string }) => void;
  removeSession: () => void;
  sessionToken: string | undefined;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | undefined>(
    undefined
  );

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  const setSession = (sessionData: { token: string }) => {
    setSessionToken(sessionData.token);
    Cookies.set("token", sessionData.token);
  };

  const removeSession = () => {
    setIsAuthenticated(false);
    setSessionToken(undefined);
    Cookies.remove("token");
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        setSession,
        removeSession,
        sessionToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
