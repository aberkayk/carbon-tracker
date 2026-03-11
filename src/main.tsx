import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/i18n";
import App from "./App.tsx";
import { seedLocalStorage } from "./mocks/seed";

if (import.meta.env.DEV) {
  seedLocalStorage();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
