import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import TopNav from "./components/Navbar";
import GetUsers from "./components/ListUsers";
import GetCommands from "./components/ListCommands";
import GetMessages from "./components/ListMessages";
import GetStatus from "./components/Status";
import GetTOS from "./components/TermsOfUse";
import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <GetUsers />,
  },
  {
    path: "/commands",
    element: <GetCommands />,
  },
  {
    path: "/messages",
    element: <GetMessages />,
  },
  {
    path: "/status",
    element: <GetStatus />,
  },
  {
    path: "/tos",
    element: <GetTOS />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TopNav />
    <RouterProvider router={router} />
  </React.StrictMode>
);
