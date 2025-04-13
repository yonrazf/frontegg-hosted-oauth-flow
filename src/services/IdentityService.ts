import { User } from "../types/user";
import { ITenantsResponseV2 } from "@frontegg/rest-api";
import { getCurrentUserUrl, getTenantsUrl } from "../utils/api";

class IdentityService {
  static async getCurrentUser(token: string): Promise<User> {
    const response = await fetch(getCurrentUserUrl(), {
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
    const response = await fetch(getTenantsUrl(), {
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
