import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App.tsx";
import "./index.less";
import "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyledEngineProvider>
);
