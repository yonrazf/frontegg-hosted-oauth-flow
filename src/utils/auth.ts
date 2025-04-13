import { FRONTEGG_CONFIG } from "../config/frontegg";

export async function getVendorToken() {
  console.log("clientId:", FRONTEGG_CONFIG.clientId);
  console.log("apiKey:", FRONTEGG_CONFIG.apiKey);
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      clientId: FRONTEGG_CONFIG.clientId,
      secret: FRONTEGG_CONFIG.apiKey,
    }),
  };

  const response = await fetch(
    "https://api.frontegg.com/auth/vendor/",
    options
  );
  const data = await response.json();
  return data.token;
}

export function createRandomString(length: number = 128): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_~.";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(array[i] % possible.length);
  }

  return text;
}

export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
