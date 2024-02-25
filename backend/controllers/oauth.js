var dotenv = require( 'dotenv' );
dotenv.config();
const { OAuth2Client } = require( 'google-auth-library' );
const { use } = require( '../routes/request' );

async function getUserData ( access_token )
{
    const response = await fetch( `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${ access_token }` );
    // console.log('response',response);
    const data = await response.json();
    return data;
    // console.log( data );
}

const getHomePage = async ( req, res, next ) =>
{
    const code = req.query.code;
    let data = "";
    try
    {
        const redirectUrl = 'https://oauth2-0-consent-screens-backend.onrender.com/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl 
        );
        const res = await oAuth2Client.getToken( code );
        await oAuth2Client.setCredentials( res.tokens );
        console.log( 'Tokens acquired' );
        const user = oAuth2Client.credentials;
        console.log( 'credentials: ', user )
        data = await getUserData( user.access_token );
        res.send( data );
    }
    catch ( err )
    {
        console.log('Error with signing in with google')
    }

    res.redirect(303, 'https://o-auth2-0-consent-screens.vercel.app');
};

module.exports = getHomePage;