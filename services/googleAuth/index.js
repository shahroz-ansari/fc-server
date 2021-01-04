const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class GoogleAuthService {
    
    async verify(token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            return {
                email: payload.email,
                picture: payload.picture,
                firstName: payload.given_name,
                lastName: payload.family_name,
            }
        } catch(err) {
            console.log(err);
            return null
        }
    }
}

module.exports = new GoogleAuthService();