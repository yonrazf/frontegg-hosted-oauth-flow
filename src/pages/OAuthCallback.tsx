import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { FRONTEGG_CONFIG } from "../config/frontegg";
import { useAuth } from "../hooks/useAuth";
import { TokenResponse } from "../types/oauth";

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
        const oauthFlow = localStorage.getItem("FRONTEGG_OAUTH_FLOW");
        let tokens: TokenResponse;
        if (oauthFlow === "pkce") {
          tokens = await authService.handleCallback(code);
        } else {
          tokens = await authService.handleAuthCodeFlowCallback(code);
        }

        updateAuthState(tokens.access_token, tokens.refresh_token);

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
      <div className="text-center"></div>
    </div>
  );
};
