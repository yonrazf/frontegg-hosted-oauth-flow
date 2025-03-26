import { memo } from "react";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header = memo(({ isAuthenticated, onLogout }: HeaderProps) => (
  <header className="header">
    <div className="container header-wrapper">
      <div className="logo-wrapper">
        <a 
          href="https://frontegg.com/" 
          target="_blank" 
          rel="noreferrer"
          aria-label="Visit Frontegg website"
        >
          <img src="/logo.svg" width={170} height={32} alt="Frontegg logo" />
        </a>
        <div className="rect-logo">
          <img src="/react.png" width={25} height={25} alt="React logo" />
        </div>
      </div>
      {isAuthenticated && (
        <button 
          className="secondary-button" 
          onClick={onLogout}
          aria-label="Logout from application"
        >
          Logout
        </button>
      )}
    </div>
  </header>
));

export default Header;
