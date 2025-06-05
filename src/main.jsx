import { createRoot } from "react-dom/client";
import React from "react";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
  
);
