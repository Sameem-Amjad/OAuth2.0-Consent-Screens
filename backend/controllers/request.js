var dotenv = require( 'dotenv' );
dotenv.config();
const { OAuth2Client } = require( 'google-auth-library' );

const userListing = async ( req, res ) =>
{
    res.header( "Access-Control-Allow-Origin", 'https://o-auth2-0-consent-screens.vercel.app' );
    res.header( "Access-Control-Allow-Credentials", 'true' );
    res.header( "Referrer-Policy", "no-referrer-when-downgrade" );
    const redirectURL = 'https://oauth2-0-consent-screens-backend.onrender.com/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl( {
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid ',
        prompt: 'consent'
    } );

    res.json( { url: authorizeUrl } );
};

module.exports = userListing; 