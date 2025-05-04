import { PublicClientApplication } from "@azure/msal-browser";

const MICROSOFT_CLIENT_ID = "80ce59e2-3a83-4650-b920-d1f2d194d3e7";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: MICROSOFT_CLIENT_ID,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:8000" // ajusta a producción si es necesario
  }
});