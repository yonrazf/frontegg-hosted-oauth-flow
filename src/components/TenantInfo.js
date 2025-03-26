import { AdminPortal, useAuth, useAuthActions } from "@frontegg/react";
import getInitials from "../utils/getInitials";
import TenantsDropdown from "./TenantsDropdown";
import { useEffect, useState } from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";

const TenantInfo = () => {
  const { switchTenant, loadUsers } = useAuthActions();
  const { tenantsState, user } = useAuth();
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  const openAccountSettings = () => {
    window.location.href = "#/admin-box/account";
    AdminPortal.show();
  };

  const handleSwitchTenant = (tenant) => {
    switchTenant({ tenantId: tenant.tenantId });
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsLoadingMembers(true);
    loadUsers({
      pageOffset: 0,
      pageSize: 100,
      callback: (res) => {
        setTotalMembers(res.length);
      },
    }).finally(() => {
      setIsLoadingMembers(false);
    });
  }, [user, loadUsers]);

  return tenantsState && tenantsState.activeTenant ? (
    <div className="tenant-card">
      <div className="tenant-title-wrapper">
        <div className="tenant-title">
          <div className="tenant-logo">
            <div className="initials">
              {getInitials(tenantsState.activeTenant.name)}
            </div>
          </div>
          <p className="tenant-name">{tenantsState.activeTenant.name}</p>
        </div>
        <TenantsDropdown
          items={tenantsState.tenants}
          selected={tenantsState.activeTenant}
          setSelected={handleSwitchTenant}
        />
      </div>
      <div className="tenant-info">
        <div className="tenant-info-item">
          <p className="tenant-info-item-title">ID</p>
          <div className="tenant-info-copy-wrapper">
            <p className="tenant-info-item-value ellipsis">
              {tenantsState.activeTenant.id}
            </p>
            <CopyToClipboardButton text={tenantsState.activeTenant.id} />
          </div>
        </div>

        <div className="tenant-info-item">
          <p className="tenant-info-item-title">Members</p>
          <p className="tenant-info-item-value">
            {isLoadingMembers ? "loading..." : totalMembers}
          </p>
        </div>

        <div className="tenant-info-item">
          <p className="tenant-info-item-title">Creator</p>
          <p className="tenant-info-item-value">
            {tenantsState.activeTenant.creatorEmail || "system"}
          </p>
        </div>
      </div>
      <button
        className="secondary-button edit-button"
        onClick={openAccountSettings}
      >
        Edit account
      </button>
    </div>
  ) : null;
};

export default TenantInfo;
