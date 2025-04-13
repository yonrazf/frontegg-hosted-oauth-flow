import Header from "./Header";
import AccountInfo from "./AccountInfo";
import Welcome from "./Welcome";
import SignupBanner from "./SignupBanner";
import { useAuth } from "../providers/AuthProvider";

const Main = () => {
  const { isAuthenticated, logout, isLoading } = useAuth(); // using our custom auth provider

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      {isAuthenticated ? <AccountInfo /> : <Welcome />}
      <SignupBanner />
      {isLoading && <div className="spinner"></div>}
    </div>
  );
};

export default Main;
