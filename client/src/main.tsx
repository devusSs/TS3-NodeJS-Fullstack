import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // TODO: strict mode is the root of our double requests and auth problems in dev mode :)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
