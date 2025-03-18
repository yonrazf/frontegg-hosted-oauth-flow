import { memo } from "react";
import PropTypes from "prop-types";

const UserInfoItem = memo(({ title, value }) => (
  <div className="tenant-info-item">
    <p className="tenant-info-item-title">{title}</p>
    <p className="tenant-info-item-value">{value}</p>
  </div>
));

UserInfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default UserInfoItem;
