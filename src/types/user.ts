export interface Role {
  id: string;
  vendorId: string;
  tenantId: string;
  key: string;
  name: string;
  description: string;
  isDefault: boolean;
  firstUserRole: boolean;
  level: number;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  key: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  roleIds: string[];
  categoryId: string;
  fePermission: boolean;
}

export interface TenantAccess {
  tenantId: string;
  roles: Role[];
  temporaryExpirationDate: string;
  isDisabled: boolean;
}

export interface User {
  accessToken: string;
  id: string;
  email: string;
  name: string;
  profilePictureUrl: string;
  sub: string;
  verified: boolean;
  mfaEnrolled: boolean;
  mfaBypass: boolean;
  phoneNumber: string;
  roles: Role[];
  permissions: Permission[];
  provider: string;
  tenantId: string;
  tenantIds: string[];
  activatedForTenant: boolean;
  isLocked: boolean;
  tenants: TenantAccess[];
  invisible: boolean;
  superUser: boolean;
  metadata: string;
  vendorMetadata: string;
  createdAt: string;
  lastLogin: string;
  groups: Record<string, any>[];
  subAccountAccessAllowed: boolean;
  managedBy: string;
}

export type UserResponse = Omit<User, "accessToken">;
