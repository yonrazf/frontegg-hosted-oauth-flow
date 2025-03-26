import { memo } from "react";

interface UserInfoItemProps {
  title: string;
  value: string;
}

const UserInfoItem = memo(({ title, value }: UserInfoItemProps) => (
  <div className="tenant-info-item">
    <p className="tenant-info-item-title">{title}</p>
    <p className="tenant-info-item-value">{value}</p>
  </div>
));

export default UserInfoItem;
