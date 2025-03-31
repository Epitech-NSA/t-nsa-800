import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
import Register from "./components/Account/Register";
import { PrivateComponent } from "./common/components/PrivateComponent";
import { SessionProvider } from "./contexts/SessionContext";

const App: React.FC = () => {
  return (
    <SessionProvider>
      <div className="App" id="wrapper">
        <Router>
          <Routes>
            <Route element={<PrivateComponent children={<Admin />} />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </SessionProvider>
  );
};

export default App;
