import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { MedicineItemsContextProvider } from "./context/medicine-items-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <MedicineItemsContextProvider>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </MedicineItemsContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);