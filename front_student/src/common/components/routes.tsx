// src/routes.tsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../../components/Account/Login";
import Register from "../../components/Account/Register";
import Admin from "../../components/Admin/Admin";
import Home from "../../components/Home/Home";
import Users from "../../components/Users/Users";
import { PrivateComponent } from "./PrivateComponent";
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateComponent>
        <Admin />
      </PrivateComponent>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
