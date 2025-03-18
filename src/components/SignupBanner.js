import React, { useEffect } from "react";
import { ContextHolder } from "@frontegg/react";

const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: "https://sandbox.frontegg.com",
  clientId: "9af126b9-c35f-4e2d-a3f1-c261e22aaf4a",
  appId: "xxxx",
};

function SignupBanner() {
  const [isdefaultCredentials, setIsdefaultCredentials] = React.useState(false);

  useEffect(() => {
    const baseUrl = ContextHolder.for().getContext().baseUrl;
    const clientId = ContextHolder.for().getContext().clientId;
    
    setIsdefaultCredentials(
      clientId === DEFAULT_SANDBOX_CONTEXT.clientId &&
        baseUrl === DEFAULT_SANDBOX_CONTEXT.baseUrl
    );
  }, []);

  return (
    <div className={`signup-banner ${isdefaultCredentials ? "show" : ""}`}>
      <div className="container signup-banner-wrapper">
        <p className="signup-banner-text">
          This sample uses Frontegg’s default credentials. Sign up to use your
          own configurations.
          <a
            href="https://portal.frontegg.com/signup"
            target="_blank"
            rel="noreferrer"
          >
            Sign up
          </a>
        </p>
        <div className="reference-links">
          <a
            href="https://developers.frontegg.com/"
            target="_blank"
            rel="noreferrer"
            className="visit-doc"
          >
            <img src="/icons/open-in-new.svg" alt="open-in-new" />
            Visit Docs
          </a>
          <div className="third-party-links">
            <a
              href="https://github.com/frontegg"
              target="_blank"
              rel="noreferrer"
              className="icon-link"
            >
              <img src="/icons/github.svg" alt="github" />
            </a>
            <a
              href="https://join.slack.com/t/frontegg-community/shared_invite/zt-e1oxi1vn-SZErBZcwHcbgj4vrwRIp5A"
              target="_blank"
              rel="noreferrer"
              className="icon-link"
            >
              <img src="/icons/slack.svg" alt="slack" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupBanner;
