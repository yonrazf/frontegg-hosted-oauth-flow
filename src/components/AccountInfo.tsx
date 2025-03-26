import { AdminPortal, useAuth } from "@frontegg/react";
import { memo } from "react";
import TenantInfo from "./TenantInfo";
import UserProfileIcon from "./UserProfileIcon";
import UserInfoItem from "./UserInfoItem";

const AccountInfo = () => {
  const { user } = useAuth();

  const handleAdminPortal = () => {
    window.location.href = "#/admin-box";
    AdminPortal.show();
  };

  const userRoles = user?.roles.map((role) => role.name).join(", ");

  return (
    <main className="section-screen">
      <div className="section-card account-card">
        <div className="title-wrapper">
          <h1 className="title">Hello, {user?.name || ""}!</h1>
          <button 
            className="primary-button fit-content" 
            onClick={handleAdminPortal}
            aria-label="Open self-service portal"
          >
            Self-service portal
          </button>
        </div>
        <div className="tenants-wrapper">
          <div className="tenant-card">
            <div className="tenant-title">
              <div className="tenant-logo">
                <UserProfileIcon user={user} />
              </div>
              <p className="tenant-name">{user?.name || ""}</p>
            </div>
            <div className="tenant-info">
              <UserInfoItem title="Name" value={user?.name || ""} />
              <UserInfoItem title="Email" value={user?.email || ""} />
              <UserInfoItem title="Roles" value={userRoles || ""} />
            </div>
            <button
              className="secondary-button edit-button"
              onClick={handleAdminPortal}
              aria-label="Edit user profile"
            >
              Edit user
            </button>
          </div>
          <TenantInfo />
        </div>
      </div>
    </main>
  );
};

export default memo(AccountInfo);
