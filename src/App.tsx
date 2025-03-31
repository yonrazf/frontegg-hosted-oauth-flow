import { ContextHolder, useAuth, useLoginWithRedirect } from "@frontegg/react";
import { memo, useEffect } from "react";
import "./App.css";
import AccountInfo from "./components/AccountInfo";
import SignupBanner from "./components/SignupBanner";
import Welcome from "./components/Welcome";
import Header from "./components/Header";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment to skip welcome page and redirect to login or app if authenticated
  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, isLoading, loginWithRedirect]);

  const handleLogout = () => {
    const baseUrl = ContextHolder.for(undefined as any).getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`;
  };

  return (
    <div className="app">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      {isAuthenticated ? (
        <AccountInfo />
      ) : (
        <Welcome onSignIn={loginWithRedirect} />
      )}
      <SignupBanner />
    </div>
  );
};

export default memo(App);
