import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FronteggProvider } from "@frontegg/react";
import { sanboxContextOptions } from "./config/sanboxContextOptions";

const root = ReactDOM.createRoot(document.getElementById("root"));
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
