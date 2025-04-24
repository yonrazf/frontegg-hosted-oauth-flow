import { ITenantsResponseV2 } from "@frontegg/rest-api";
import { User } from "./user";

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
}
export interface UserToken {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  metadata: {
    name: string;
  };
  roles: string[];
  permissions: string[];
  tenantId: string;
  tenantIds: string[];
  profilePictureUrl: string;
  sid: string;
  type: string;
  applicationId: string;
  aud: string;
  iss: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginWithPKCE: () => Promise<void>;
  loginWithAuthCodeFlow: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | false>;
  updateAuthState: (
    token: string | null,
    refreshToken: string | null
  ) => Promise<void>;
  refreshToken: string | null;
  isLoading: boolean;
  tenants: ITenantsResponseV2[];
}
