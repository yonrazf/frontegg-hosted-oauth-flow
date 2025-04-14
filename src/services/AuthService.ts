import {
  createRandomString,
  generateCodeChallenge,
  getAuthCodeFlowAuthorization,
  getVendorToken,
} from "../utils/auth";
import { FRONTEGG_CONFIG } from "../config/frontegg";
import { TokenResponse } from "../types/oauth";
import {
  getAuthorizationUrl,
  getTokenUrl,
  getAuthorizationClientId,
} from "../utils/api";

class AuthService {
  private static instance: AuthService;
  //   private vendorToken: string | null = null;

  private constructor() {
    // Bind methods to ensure 'this' context is preserved
    this.initiateLoginWithAuthCodeFlow =
      this.initiateLoginWithAuthCodeFlow.bind(this);
    this.getRedirectUriConfig = this.getRedirectUriConfig.bind(this);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      console.log("Creating new AuthService instance");
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // ------------------------------------------------------------
  // Handle the PKCE flow
  // ------------------------------------------------------------

  async initiateLogin(): Promise<void> {
    const code_verifier = createRandomString();
    localStorage.setItem("code_verifier", code_verifier);
    localStorage.setItem("FRONTEGG_OAUTH_FLOW", "pkce");
    const code_challenge = await generateCodeChallenge(code_verifier);

    const params = new URLSearchParams({
      client_id: getAuthorizationClientId()!,
      redirect_uri: FRONTEGG_CONFIG.oauthRedirectUri,
      response_type: "code",
      scope: FRONTEGG_CONFIG.scopes.join(" "),
      state: FRONTEGG_CONFIG.state,
      code_challenge: code_challenge,
    });

    window.location.href = `${getAuthorizationUrl()}?${params.toString()}`;
  }

  // Handle the PKCE flow token exchange
  async handleCallback(code: string): Promise<TokenResponse> {
    const code_verifier = localStorage.getItem("code_verifier");
    if (!code_verifier) {
      throw new Error("No code_verifier found in localStorage");
    }

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: FRONTEGG_CONFIG.oauthRedirectUri,
      code_verifier: code_verifier,
    });

    const response = await fetch(getTokenUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error(
        "Token request failed:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to exchange code for tokens");
    }

    const tokens: TokenResponse = await response.json();
    console.log("Received tokens:", tokens);
    return tokens;
  }

  async refreshAccessToken(refresh_token: string): Promise<void> {
    if (!refresh_token) {
      throw new Error("No refresh token available");
    }
    const oauthFlow = localStorage.getItem("FRONTEGG_OAUTH_FLOW");
    const isPKCE = oauthFlow === "pkce";
    const paramsOptions = isPKCE
      ? ({
          grant_type: "refresh_token",
          refresh_token: refresh_token,
        } as Record<string, string>)
      : {
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          redirect_uri: FRONTEGG_CONFIG.oauthRedirectUri, // only needed for auth code flow when using redirect_uri-specific client_id and client_secret
        };

    const params = new URLSearchParams(paramsOptions);

    const authorization = getAuthCodeFlowAuthorization();

    const headers = isPKCE
      ? {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      : ({
          Authorization: `Basic ${authorization}`,
          "Content-Type": "application/x-www-form-urlencoded",
        } as Record<string, string>);

    const response = await fetch(getTokenUrl(), {
      method: "POST",
      headers,
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const tokens = await response.json();
    return tokens;
  }

  // ------------------------------------------------------------
  // Handle the auth code flow
  // ------------------------------------------------------------
  // Some prefer to use redirect_uri-specific client_id and client_secret
  // So we need to fetch the redirect_uri-specific config, and then use that to get the tokens & refresh tokens.
  // In this example, the redirect_uri specific config is defined in the FRONTEGG_CONFIG.oauthClientId and FRONTEGG_CONFIG.oauthClientSecret
  // ------------------------------------------------------------

  async getRedirectUriConfig(): Promise<any> {
    const token = await getVendorToken();
    if (!token) {
      throw new Error("No access token available");
    }

    const response = await fetch(
      "https://api.frontegg.com/oauth/resources/configurations/v1/redirect-uri",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch redirect URI config: ${response.statusText}`
      );
    }

    const configs = await response.json();
    console.log("configs:", configs);
    return configs;
  }

  // ------------------------------------------------------------
  // Handle the auth code flow
  // ------------------------------------------------------------

  // Initiate the auth code flow
  async initiateLoginWithAuthCodeFlow() {
    const redirectUriConfig = await this.getRedirectUriConfig();

    localStorage.setItem("FRONTEGG_OAUTH_FLOW", "auth_code");

    if (!redirectUriConfig) {
      throw new Error("No redirect URI config found");
    }

    const redirectUri = redirectUriConfig.redirectUris.find(
      (r: any) => r.redirectUriPattern === FRONTEGG_CONFIG.oauthRedirectUri
    );
    if (!redirectUri) {
      throw new Error("No redirect URI found");
    }

    const client_id = getAuthorizationClientId()!;

    const params = new URLSearchParams({
      client_id, // this will be redirectUri.clientId if you decide to use redirect_uri-specific client_id and client_secret
      redirect_uri: FRONTEGG_CONFIG.oauthRedirectUri,
      response_type: "code",
      scope: FRONTEGG_CONFIG.scopes.join(" "),
    });
    console.log(
      "Redirecting to:",
      `${getAuthorizationUrl()}?${params.toString()}`
    );

    window.location.href = `${getAuthorizationUrl()}?${params.toString()}`;
  }

  // Handle the auth code flow token exchange
  async handleAuthCodeFlowCallback(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: FRONTEGG_CONFIG.oauthRedirectUri,
    });

    const authorization = getAuthCodeFlowAuthorization();

    const response = await fetch(getTokenUrl(), {
      method: "POST",
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for tokens");
    }

    const tokens: TokenResponse = await response.json();
    return tokens;
  }
}

export const authService = AuthService.getInstance();
