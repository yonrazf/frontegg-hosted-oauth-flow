import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FronteggProvider } from "@frontegg/react";
import { sanboxContextOptions } from "./config/sanboxContextOptions";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <FronteggProvider
      contextOptions={sanboxContextOptions}
      hostedLoginBox={true}
      authOptions={{
        keepSessionAlive: true,
      }}
    >
      <App />
    </FronteggProvider>
  </React.StrictMode>
);
