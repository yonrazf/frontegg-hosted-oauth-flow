import { FronteggProvider } from "@frontegg/react";
import { memo, useState } from "react";
import "./App.css";
import { sanboxContextOptions } from "./config/sanboxContextOptions";
import Main from "./components/Main";

const App = () => {
  const [fronteggLoading, setFronteggLoading] = useState(true);
  
  return (
    <>
      <FronteggProvider
        contextOptions={sanboxContextOptions}
        hostedLoginBox={true}
        authOptions={{
          keepSessionAlive: true,
        }}
        customLoader={setFronteggLoading}
      >
        <Main />
      </FronteggProvider>
      {fronteggLoading && <div className="spinner"></div>}
    </>
  );
};

export default memo(App);
