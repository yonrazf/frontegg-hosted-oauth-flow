import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import SandboxToggle from "./SandboxToggle";

const Welcome = () => {
  const { loginWithPKCE, loginWithAuthCodeFlow } = useAuth();
  const [useSandboxCredentials, setUseSandboxCredentials] = useState(() => {
    const saved = localStorage.getItem("useSandboxCredentials");
    return saved === "true";
  });

  return (
    <section className="section-screen">
      <div className="section-card welcome-card">
        <img src="/assets/hug.png" alt="Welcome" width={56} height={56} />
        <div className="welcome-texts">
          <h1 className="welcome-title">Welcome!</h1>
          <p className="welcome-text">
            This is Frontegg's sample app that will let you experiment with our
            authentication flows.
          </p>
        </div>
        <SandboxToggle
          isChecked={useSandboxCredentials}
          onToggle={setUseSandboxCredentials}
        />
        <button className="primary-button" onClick={loginWithPKCE}>
          Sign in with PKCE
        </button>
        <button className={`primary-button`} onClick={loginWithAuthCodeFlow}>
          Sign in with Auth Code Flow
        </button>
      </div>
    </section>
  );
};

export default Welcome;
