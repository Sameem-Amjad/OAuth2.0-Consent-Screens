var dotenv = require( 'dotenv' );
dotenv.config();
const { OAuth2Client } = require( 'google-auth-library' );
const { use } = require( '../routes/request' );

async function getUserData ( access_token )
{
    const response = await fetch( `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${ access_token }` );
    // console.log('response',response);
    const data = await response.json();
    // console.log( data );
    return data;
}

const getHomePage = async ( req, res, next ) =>
{
    const code = req.query.code;
    let data = "";
   try {
        const redirectUrl = 'https://oauth2-0-consent-screens-backend.onrender.com/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const resp = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(resp.tokens);

        const user = oAuth2Client.credentials;
        // console.log('credentials:', user);

        // Assuming getUserData returns the data you want to send
        data = await getUserData(user.access_token);
    //    console.log( data.name );
        // Redirect to another URL with the data as query parameters
        res.redirect(303, `https://o-auth2-0-consent-screens.vercel.app?data=${encodeURIComponent(JSON.stringify(data)+"\n"+JSON.stringify(user))}`);
    } catch (err) {
        console.log('Error with signing in with google: ', err);
        res.redirect(303, 'https://o-auth2-0-consent-screens.vercel.app'); // Redirect without data in case of an error
    }
};

module.exports = getHomePage;