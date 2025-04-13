import { useEffect } from "react";

interface SandboxToggleProps {
  isChecked: boolean;
  onToggle: (value: boolean) => void;
}

const SandboxToggle = ({ isChecked, onToggle }: SandboxToggleProps) => {
  useEffect(() => {
    localStorage.setItem(
      "useSandboxCredentials",
      isChecked.toString() || "false"
    );
  }, [isChecked]);

  return (
    <div className="toggle-container">
      <label className="toggle-label">
        Use Sandbox Credentials
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onToggle(e.target.checked)}
          className="toggle-input"
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export default SandboxToggle;
