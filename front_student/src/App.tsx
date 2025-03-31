import React from "react";
import { RouterProvider } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import router from "./common/components/routes";

const App: React.FC = () => {
  return (
    <SessionProvider>
      <div className="App" id="wrapper">
        <RouterProvider router={router} />
      </div>
    </SessionProvider>
  );
};

export default App;
