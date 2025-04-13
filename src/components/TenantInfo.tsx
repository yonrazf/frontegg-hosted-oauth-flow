import { useAuth } from "../providers/AuthProvider";
import getInitials from "../utils/getInitials";
import CopyToClipboardButton from "./CopyToClipboardButton";
import TenantsDropdown from "./TenantsDropdown";
import { useEffect, useMemo } from "react";
import { ITenantsResponseV2 } from "@frontegg/rest-api";

// type ITentantsExtended = ITenantsResponseV2 & {
//   creatorEmail: string;
// };

const TenantInfo = () => {
  const { user, tenants } = useAuth();

  // const {
  //   loaders: { USERS: isLoadingUsers },
  //   users,
  // } = useTeamState();

  // useEffect(() => {
  //   loadUsers({ pageOffset: 0, pageSize: 100 });
  // }, [loadUsers]);

  // const usersCount = users.length;

  // const openAccountSettings = () => {
  //   window.location.href = "#/admin-box/account";
  //   AdminPortal.show();
  // };

  const handleSwitchTenant = (tenant: ITenantsResponseV2) => {
    // switchTenant({ tenantId: tenant.tenantId }); // not implemented yet
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

        {/* <div className="tenant-info-item">
          <p className="tenant-info-item-title">Members</p>
          <p className="tenant-info-item-value">
            {isLo ? "loading..." : usersCount}
          </p>
        </div> */}
        {/* <div className="tenant-info-item">
          <p className="tenant-info-item-title">Creator</p>
          <p className="tenant-info-item-value">
            {(tenantsState.activeTenant as ITentantsExtended).creatorEmail ||
              "system"}
          </p>
        </div> */}
      </div>
      {/* <button
        className="secondary-button edit-button"
        onClick={openAccountSettings}
      >
        Edit account
      </button> */}
    </div>
  ) : null;
};

export default TenantInfo;
