import { useState, useEffect } from 'react';
import google from './assets/google.png';
import microsoft from './assets/microsoft.png';
import './App.css';
import { useMsal } from '@azure/msal-react';
function App ()
{
  const [ data, setData ] = useState( null );
  const { instance, accounts } = useMsal();

  const handleLogin = async () =>
  {
    try
    {
      await instance.loginPopup();
    } catch ( error )
    {
      console.error( error );
    }
  };

  const handleLogout = () =>
  {
    instance.logout();
  };

  useEffect( () =>
  {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams( window.location.search );

    // Get the value of the 'data' parameter
    let dataValue = queryParams.get( 'data' );
    // Use the dataValue as needed

    console.clear();
    console.log( 'Received data:', dataValue );

    // Set the data in the component state
    setData( dataValue );
  }, [] );
  function navigate ( url )
  {
    window.location.href = url;
  }
  async function auth ()
  {
    const response = await fetch( 'https://oauth2-0-consent-screens-backend.onrender.com/request', { method: 'post', mode: 'cors' }, );
    const data = await response.json();
    navigate( data.url );
  }
  return (
    <>
      <div>
        <h1>Welcome TO Auth2.0 Consent Screens</h1>
        <div className="card">
          <button style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 } } onClick={ () => auth() }>
            <img style={ { height: 35 } } src={ google } alt="" />
            <h1 style={ { fontSize: 16 } }>Sign In With Google</h1>
          </button>
        </div>
        <div className="card">
          { accounts.length === 0 ? (
            <button style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 } } onClick={ handleLogin }>
              <img style={ { height: 35 } } src={ microsoft } alt="" />
              <h1 style={ { fontSize: 16 } }>Login with Microsoft</h1>
            </button>
          ) : (
            <button style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 } } onClick={ handleLogout }>
              <img style={ { height: 35 } } src={ microsoft } alt="" />
              <h1 style={ { fontSize: 16 } }>Logout</h1>
            </button>
          ) }
        </div>
      </div>
    </>
  );
}

export default App;
