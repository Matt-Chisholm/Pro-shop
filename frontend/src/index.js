import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/bootstrap.custom.css"; // Importing Bootstrap CSS file
import "./assets/styles/index.css"; // Importing CSS file
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<App />}></Route>)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
