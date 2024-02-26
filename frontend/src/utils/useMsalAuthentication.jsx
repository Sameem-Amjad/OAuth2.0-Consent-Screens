import { useMsalAuthentication } from '@azure/msal-react';

const ProtectedRoute = () => {
  const { accounts } = useMsalAuthentication();

  return (
    <div>
      {accounts.length > 0 ? (
        <p>This is a protected route.</p>
      ) : (
        <p>Please log in to access this route.</p>
      )}
    </div>
  );
};
