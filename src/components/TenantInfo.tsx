import { useAuth } from "../hooks/useAuth";
import getInitials from "../utils/getInitials";
import CopyToClipboardButton from "./CopyToClipboardButton";
import TenantsDropdown from "./TenantsDropdown";
import { useEffect, useMemo } from "react";
import { ITenantsResponseV2 } from "@frontegg/rest-api";
import { getBaseUrl } from "../utils/api";

const TenantInfo = () => {
  const { user, tenants } = useAuth();

  const switchTenant = async (tenantId: string) => {
    const response = await fetch(
      `${getBaseUrl()}/identity/resources/users/v1/tenant`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
          "frontegg-user-id": user?.id || "",
          "frontegg-tenant-id": user?.tenantId || "",
        },
        body: JSON.stringify({
          tenantId: tenantId,
        }),
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to switch tenant");
    }
  };

  const handleSwitchTenant = (tenant: ITenantsResponseV2) => {
    switchTenant(tenant.tenantId);
  };

  const activeTenant = useMemo(() => {
    return tenants.find((tenant) => tenant.tenantId === user?.tenantId);
  }, [tenants, user]);

  return activeTenant ? (
    <div className="tenant-card">
      <div className="tenant-title-wrapper">
        <div className="tenant-title">
          <div className="tenant-logo">
            <div className="initials">
              {getInitials(activeTenant?.name || "")}
            </div>
          </div>
          <p className="tenant-name">{activeTenant?.name || ""}</p>
        </div>
        <TenantsDropdown
          items={tenants}
          selected={activeTenant}
          setSelected={handleSwitchTenant}
        />
      </div>
      <div className="tenant-info">
        <div className="tenant-info-item">
          <p className="tenant-info-item-title">ID</p>
          <div className="tenant-info-copy-wrapper">
            <p className="tenant-info-item-value ellipsis">
              {activeTenant?.id}
            </p>
            <CopyToClipboardButton text={activeTenant!.id} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TenantInfo;
