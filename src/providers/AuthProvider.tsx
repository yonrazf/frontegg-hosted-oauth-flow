import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import { UserToken, AuthContextType } from "../types/oauth";
import { User } from "../types/user";
import { identityService } from "../services/IdentityService";
import { FRONTEGG_CONFIG } from "../config/frontegg";
import { getVendorToken } from "../utils/auth";
import { ITenantsResponseV2 } from "@frontegg/rest-api";
import { getBaseUrl } from "../utils/api";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [tenants, setTenants] = useState<ITenantsResponseV2[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAccessToken();
  }, []);

  const updateAuthState = async (
    token: string | null,
    refreshToken: string | null
  ) => {
    setIsLoading(true);
    setAccessToken(token);
    setRefreshToken(refreshToken);
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        const user = await identityService.getCurrentUser(token);
        const tenants = await identityService.getTenants(token);
        setUser(user);
        setTenants(tenants);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setTenants([]);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const loginWithPKCE = async () => {
    setIsLoading(true);
    await authService.initiateLogin();
    setIsLoading(false);
  };

  const loginWithAuthCodeFlow = async () => {
    setIsLoading(true);
    await authService.initiateLoginWithAuthCodeFlow();
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);

    updateAuthState(null, null);
    window.location.href = `${getBaseUrl()}/oauth/logout?post_logout_redirect_uri=${
      window.location.href
    }`;

    setIsLoading(false);
  };

  const getAccessToken = async () => {
    setIsLoading(true);
    const tokenResult = await authService.silentRefresh();
    setIsLoading(false);
    if (tokenResult && tokenResult.access_token) {
      updateAuthState(tokenResult.access_token, tokenResult.refresh_token);
      return tokenResult.access_token;
    }
    return false;
  };

  const value = {
    isAuthenticated,
    user,
    loginWithPKCE,
    loginWithAuthCodeFlow,
    logout,
    getAccessToken,
    updateAuthState,
    refreshToken,
    isLoading,
    tenants,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
