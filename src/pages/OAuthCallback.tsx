import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { FRONTEGG_CONFIG } from "../config/frontegg";
import { useAuth } from "../providers/AuthProvider";

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const { updateAuthState } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const error = params.get("error");

      if (error) {
        console.error("OAuth error:", error);
        setTimeout(() => {
          navigate("/home");
        }, 10000);
        return;
      }

      if (!code || (state && state !== FRONTEGG_CONFIG.state)) {
        console.error("Invalid OAuth response");
        setTimeout(() => {}, 10000);
        navigate("/home");
        return;
      }

      try {
        console.log("state:", state);
        if (state) {
          console.log(" state is true, going with pkce flow");
          const tokens = await authService.handleCallback(code);
          updateAuthState(tokens.access_token, tokens.refresh_token);
        } else {
          console.log("state is false, going with auth code flow");
          const tokens = await authService.handleAuthCodeFlowCallback(code);
          updateAuthState(tokens.access_token, tokens.refresh_token);
        }

        // Get the saved redirect URL or default to home
        const redirectUrl =
          localStorage.getItem("FRONTEGG_AFTER_AUTH_REDIRECT_URL") || "/";
        localStorage.removeItem("FRONTEGG_AFTER_AUTH_REDIRECT_URL");
        navigate(redirectUrl);
      } catch (error) {
        console.error("Failed to handle OAuth callback:", error);
        navigate("/home");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing login...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};
