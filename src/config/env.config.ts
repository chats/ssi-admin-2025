
export const AuthConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID , // จาก Keycloak client configuration
  clientSecret: import.meta.env.VITE_OIDC_CLIENT_SECRET, // กำหนดใน Keycloak
  redirectUri: `${window.location.origin}`,
  responseType: 'code',
  scope: 'openid profile email',
  postLogoutRedirectUri: `${window.location.origin}/logged-out`,
  loadUserInfo: true,
    // Disable automatic signin
  automaticSilentSignin: false,
  automaticSilentRenew: true,
  silentRequestTimeout: 10000, // 10 seconds timeout for silent refresh
  checkSessionIntervalInSeconds: 30, // Check session every 30 seconds
  silentRedirectUri: `${window.location.origin}/silent-refresh.html`,
  // Add back channel logout configuration
  monitorSession: true,
  endSessionEndpoint: `${import.meta.env.VITE_OIDC_AUTHORITY}/protocol/openid-connect/logout`,
};

export interface AgentConfig {
    agentApiUrl: string;
    agentApiKey: string;
    agentWssUrl: number;
    apiTimeout: number;
    did?: string;
    service?: string;
}

export const issuerConfig: AgentConfig = {
    apiTimeout: 10000,
    agentApiUrl: import.meta.env.VITE_ISSUER_API,
    agentApiKey: import.meta.env.VITE_ISSUER_KEY,
    agentWssUrl: import.meta.env.VITE_ISSUER_WSS,
    service: import.meta.env.VITE_ISSUER_SERVICE,
    did: import.meta.env.VITE_ISSUER_DID,
};

export const verifierConfig: AgentConfig = {
    apiTimeout: 10000,
    agentApiUrl: import.meta.env.VITE_VERIFIER_API,
    agentApiKey: import.meta.env.VITE_VERIFIER_KEY,
    agentWssUrl: import.meta.env.VITE_VERIFIER_WSS,
    service: import.meta.env.VITE_VERIFIER_SERVICE,
    did: import.meta.env.VITE_VERIFIER_DID,
};

export const holderConfig: AgentConfig = {
    apiTimeout: 10000,
    agentApiUrl: import.meta.env.VITE_HOLDER_API,
    agentApiKey: import.meta.env.VITE_HOLDER_KEY,
    agentWssUrl: import.meta.env.VITE_HOLDER_WSS,
    service: import.meta.env.VITE_HOLDER_SERVICE,
    did: import.meta.env.VITE_HOLDER_DID,
};