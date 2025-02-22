import React from "react";
import ReactDOM from "react-dom/client"; // Note the "client" import for React 18
import App from "./App";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
