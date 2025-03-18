import { memo } from "react";
import PropTypes from "prop-types";
import getInitials from "../utils/getInitials";

const UserProfileIcon = memo(({ user }) => {
  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.parentNode.innerHTML = `<div class="initials" role="img" aria-label="User initials">${getInitials(
      user.name
    )}</div>`;
  };

  if (user.profilePictureUrl) {
    return (
      <img
        src={user.profilePictureUrl}
        alt={`${user.name}'s profile`}
        width={24}
        height={24}
        onError={handleImageError}
      />
    );
  }

  return (
    <div className="initials" role="img" aria-label="User initials">
      {getInitials(user.name)}
    </div>
  );
});

UserProfileIcon.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilePictureUrl: PropTypes.string,
  }).isRequired,
};

export default UserProfileIcon;
