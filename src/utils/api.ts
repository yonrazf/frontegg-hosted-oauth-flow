import { FRONTEGG_CONFIG, FRONTEGG_ENDPOINTS } from "../config/frontegg";
import { SANDBOX_CONTEXT_OPTIONS } from "../config/sanboxContextOptions";

export function getBaseUrl() {
  const useSandboxCredentials =
    localStorage.getItem("useSandboxCredentials") === "true";
  return useSandboxCredentials
    ? SANDBOX_CONTEXT_OPTIONS.baseUrl
    : FRONTEGG_CONFIG.baseUrl;
}

export function getCurrentUserUrl() {
  return `${getBaseUrl()}${FRONTEGG_ENDPOINTS.currentUser}`;
}

export function getTenantsUrl() {
  return `${getBaseUrl()}${FRONTEGG_ENDPOINTS.tenants}`;
}

export function getAuthorizationUrl() {
  return `${getBaseUrl()}${FRONTEGG_ENDPOINTS.authorization}`;
}

export function getTokenUrl() {
  return `${getBaseUrl()}${FRONTEGG_ENDPOINTS.token}`;
}

export function getAuthorizationClientId() {
  const useSandboxCredentials = localStorage.getItem("useSandboxCredentials");
  return useSandboxCredentials
    ? SANDBOX_CONTEXT_OPTIONS.appId
    : FRONTEGG_CONFIG.oauthAppId;
}

// export function getAuthorizationClientSecret() {
//   const useSandboxCredentials = localStorage.getItem("useSandboxCredentials");
//   return useSandboxCredentials
//     ? SANDBOX_CONTEXT_OPTIONS.appSecret
//     : FRONTEGG_CONFIG.oauthAppSecret;
// }
