import { useEffect, useRef, useState } from "react";
import getInitials from "../utils/getInitials";

const TenantsDropdown = ({ items, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/icons/unfold-more.svg" alt="Other tenants" />
      </button>
      <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {items.map((item) => (
          <button
            key={item.id}
            className={`dropdown-item ${
              selected?.id === item.id ? "active" : ""
            }`}
            onClick={() => {
              setSelected(item);
              setIsOpen(false);
            }}
          >
            <div className="dropdown-item-content">
              <div className="initials">{getInitials(item.name)}</div>
              {item.name}
            </div>

            {selected?.id === item.id && (
              <img src="/icons/checkmark.svg" alt="Selected tenant" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenantsDropdown;
