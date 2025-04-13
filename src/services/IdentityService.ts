import { FRONTEGG_CONFIG } from "../config/frontegg";
import { User, UserResponse } from "../types/user";
import { ITenantsResponseV2 } from "@frontegg/rest-api";

class IdentityService {
  private static GET_CURRENT_USER_URL = `${FRONTEGG_CONFIG.baseUrl}/identity/resources/users/v2/me`;
  private static GET_TENANTS_URL = `${FRONTEGG_CONFIG.baseUrl}/identity/resources/users/v2/me/tenants`;
  static async getCurrentUser(token: string): Promise<User> {
    const response = await fetch(this.GET_CURRENT_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const userData = await response.json();
    return {
      accessToken: token,
      ...userData,
    };
  }

  static async getTenants(token: string): Promise<ITenantsResponseV2[]> {
    const response = await fetch(this.GET_TENANTS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tenants: ${response.statusText}`);
    }

    const tenantsData = await response.json();
    return tenantsData;
  }
}

export const identityService = IdentityService;
