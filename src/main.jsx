import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";           // <- important: must import Tailwind CSS here

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
