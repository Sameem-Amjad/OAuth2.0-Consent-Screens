export const msalConfig = {
  auth: {
    clientId:  import.meta.env.VITE_APPLICATION_ID ,
    authority:  `https://login.microsoftonline.com/${ import.meta.env.VITE_DIRECTORY_ID }`,
    redirectUri: 'https://o-auth2-0-consent-screens.vercel.app/', // Should match the redirect URI in Azure AD
  },
  cache: {
    cacheLocation: 'sessionStorage', // You can customize this based on your needs
    storeAuthStateInCookie: false,
  },
};
