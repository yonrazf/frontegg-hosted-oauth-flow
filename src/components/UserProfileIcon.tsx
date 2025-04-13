import getInitials from "../utils/getInitials";
import { User } from "../types/user";

interface UserProfileIconProps {
  user: User | null | undefined;
}

const UserProfileIcon = ({ user }: UserProfileIconProps) => {
  const handleImageError = (e: any) => {
    e.target.style.display = "none";
    e.target.parentNode.innerHTML = `<div class="initials" role="img" aria-label="User initials">${getInitials(
      user?.name || ""
    )}</div>`;
  };

  if (user?.profilePictureUrl) {
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
      {getInitials(user?.name || "")}
    </div>
  );
};

export default UserProfileIcon;
