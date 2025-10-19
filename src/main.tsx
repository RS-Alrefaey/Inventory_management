import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.tsx";
import { DataProvider } from "./contexts/DataContext.tsx";
import { NavProvider } from "./contexts/NavContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <NavProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </NavProvider>
    </DarkModeProvider>
  </StrictMode>
);
