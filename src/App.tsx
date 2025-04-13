import { memo, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Main from "./components/Main";

const App = () => {
  
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default memo(App);
