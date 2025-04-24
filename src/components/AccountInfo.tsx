import { memo } from "react";
import TenantInfo from "./TenantInfo";
import UserProfileIcon from "./UserProfileIcon";
import UserInfoItem from "./UserInfoItem";
import { useAuth } from "../hooks/useAuth";

const AccountInfo = () => {
  const { user } = useAuth();

  const userRoles = user?.roles.map((role) => role.name).join(", ");

  return (
    <main className="section-screen">
      <div className="section-card account-card">
        <div className="title-wrapper">
          <h1 className="title">Hello, {user?.name || ""}!</h1>
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
          </div>
          <TenantInfo />
        </div>
      </div>
    </main>
  );
};

export default memo(AccountInfo);
