import { useState } from 'react';
import reactLogo from './assets/react.svg';
import google from './assets/google.png';
import './App.css';

function App ()
{
  const [ count, setCount ] = useState( 0 );
  function navigate ( url )
  {
    window.location.href=url
  }
  async function auth ()
  {
    const response = await fetch( 'http://127.0.0.1:3000/request', { method: 'post' } );
    const data = await response.json();
    navigate(data.url)
  }
  return (
    <>
      <div>
        <h1>Welcome TO Auth2.0 Consent Screens</h1>
        <div className="card">
          <button style={{display:'flex',justifyContent:'center',alignItems:'center',gap:15}} onClick={ () =>  auth()}>
            <img style={ { height: 35 } } src={ google } alt="" />
            <h1 style={{fontSize:16}}>Sign In With Google</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
