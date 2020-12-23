const { OAuth2Client } = require('google-auth-library');
const authService = require('./service.auth');


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// handles google user authentication using token provided from frontend
// return a authToken to be used for logged in users
const handleAuthenticationRequest = async (req, res) => {
    try {
        let idToken;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            idToken = req.headers.authorization.split(' ')[1];
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const { email, picture, given_name, family_name } = payload;
            
            authService.saveOrUpdateUser(email, given_name, family_name, picture, 'google').then(token => {
                res.send({
                    status: 1,
                    authToken: token
                })
            }).catch(err => {
                console.log('error in saving in db', err);
                throw new Error('Something went wrong.');
            })

        } else {
            throw new Error('Token not found!')
        }

    } catch (err) {
        console.log('error', err);
        res.status(401).send({
            status: 0,
            message: err
        })
    }







}

module.exports = { handleAuthenticationRequest }