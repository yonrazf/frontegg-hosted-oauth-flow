export const FRONTEGG_CONFIG = {
  baseUrl: process.env.REACT_APP_FE_BASE_URL, // base url of your frontegg instance, under Keys & Domains >> Domains section

  clientId: process.env.REACT_APP_FE_CLIENT_ID, // client id of your frontegg instance, under Keys & Domains >> General section
  apiKey: process.env.REACT_APP_FE_API_KEY, // api key of your frontegg instance, under Keys & Domains >> General section

  oauthAppId: process.env.REACT_APP_FE_OAUTH_APP_ID, //app id of your frontegg instance, under Applications section >> [your app] >> ID
  oauthAppSecret: process.env.REACT_APP_FE_OAUTH_APP_SECRET, //app secret of your frontegg instance, under Applications section >> [your app] >> Api Key
  oauthRedirectUri: "http://localhost:3000/oauth/callback", // redirect uri of your frontegg instance, under Login Method >> Redirect URIs section. this will also be the route for callback after login
  scopes: ["openid", "email", "profile"],
  state: "random-state-string", // used in the auth code flow

  oauthClientId: process.env.REACT_APP_FE_OAUTH_CLIENT_ID, // got from the /redirect-uri endpoint, tied spcifically to a certain redirect uri
  oauthClientSecret: process.env.REACT_APP_FE_OAUTH_CLIENT_SECRET, // got from the /redirect-uri endpoint, tied spcifically to a certain redirect uri
};

export const FRONTEGG_ENDPOINTS = {
  authorization: `/oauth/authorize`,
  token: `/oauth/token`,
  currentUser: `/identity/resources/users/v2/me`,
  tenants: `/identity/resources/users/v2/me/tenants`,
};
