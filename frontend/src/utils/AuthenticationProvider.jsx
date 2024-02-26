// AuthenticationProvider.jsx
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { PublicClientApplication } from '@azure/msal-browser';

const msalInstance = new PublicClientApplication( msalConfig );


const AuthenticationProvider = ({ children }) => {
  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
};

export default AuthenticationProvider;
