import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import { UserToken, AuthContextType } from "../types/oauth";
import { User } from "../types/user";
import { identityService } from "../services/IdentityService";
import { FRONTEGG_CONFIG } from "../config/frontegg";
import { getVendorToken } from "../utils/auth";
import { ITenantsResponseV2 } from "@frontegg/rest-api";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

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
    const token = getAccessToken();
    if (token) {
      updateAuthState(token, refreshToken);
    }
    setIsLoading(false);
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
    const token = await getVendorToken(); // you'll have to use a vendor token here, better to use your own backend for that
    if (token) {
      try {
        await fetch(
          `https://api.frontegg.com/identity/resources/auth/v1/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "frontegg-vendor-host": window.location.hostname,
            },
            credentials: "include",
          }
        );
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    updateAuthState(null, null);
    setIsLoading(false);
  };

  const getAccessToken = () => {
    return accessToken;
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

  return (
    <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
