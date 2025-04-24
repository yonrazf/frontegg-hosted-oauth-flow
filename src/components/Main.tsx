import Header from "./Header";
import AccountInfo from "./AccountInfo";
import Welcome from "./Welcome";
import SignupBanner from "./SignupBanner";
import { useAuth } from "../hooks/useAuth";

const Main = () => {
  const { isAuthenticated, logout, isLoading } = useAuth(); // using our custom auth provider

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          {isAuthenticated ? <AccountInfo /> : <Welcome />}
          <SignupBanner />
        </>
      )}
    </div>
  );
};

export default Main;
