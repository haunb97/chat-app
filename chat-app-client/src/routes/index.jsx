import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Chat from "../pages/chat";
import Login from "../pages/login";
import { path } from "./path";

export default function router() {
  return createBrowserRouter([
    { path: path.login, element: <Login /> },
    { path: path.chat, element: <Chat /> },
    { path: path.all, element: <Navigate to={path.login} replace /> },
  ]);
}
