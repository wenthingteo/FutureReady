import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈 import router
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

// `!` tells TypeScript that rootElement won't be null
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>   {/* 👈 wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
