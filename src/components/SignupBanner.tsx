import React, { useEffect } from "react";
import { ContextHolder } from "@frontegg/react";

const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: "https://sandbox.frontegg.com",
  appId: "da398ff8-c069-428e-974a-afcded8c0c04",
};

function SignupBanner() {
  const [isdefaultCredentials, setIsdefaultCredentials] = React.useState(false);

  useEffect(() => {
    const baseUrl = ContextHolder.for(undefined as any).getContext().baseUrl;
    const appId = ContextHolder.for(undefined as any).getContext().appId;

    setIsdefaultCredentials(
      baseUrl === DEFAULT_SANDBOX_CONTEXT.baseUrl &&
        appId === DEFAULT_SANDBOX_CONTEXT.appId
    );
  }, []);

  return (
    <div
      className={`signup-banner ${
        !isdefaultCredentials ? "custom-credentials" : ""
      }`}
    >
      <div className="container signup-banner-wrapper">
        <p className="signup-banner-text">
          This sample uses Frontegg’s default credentials. Sign up to use your
          own configurations.
          <a
            href="https://frontegg-prod.us.frontegg.com/oauth/account/sign-up"
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="#373739"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.6667 10.6667H1.33333V1.33333H6V0H1.33333C0.593333 0 0 0.6 0 1.33333V10.6667C0 11.4 0.593333 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V6H10.6667V10.6667ZM7.33333 0V1.33333H9.72667L3.17333 7.88667L4.11333 8.82667L10.6667 2.27333V4.66667H12V0H7.33333Z" />
            </svg>
            Visit Docs
          </a>
          <div className="third-party-links">
            <a
              href="https://github.com/frontegg-samples/react-hosted-login"
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
