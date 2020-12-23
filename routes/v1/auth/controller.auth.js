const { OAuth2Client } = require('google-auth-library');
const authService = require('./service.auth');
const errorCodes = require('../../../const/errorCodes');


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// handles google user authentication using token provided from frontend
// return a authToken to be used for logged in users
const handleGoogleAuthenticationRequest = async (req, res) => {
    let error = null;
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
                    data: token
                })
            }).catch(err => {
                error = errorCodes.DATABASE_ERROR;
                throw new Error(err);
            })

        } else {
            error = errorCodes.TOKEN_NOT_FOUND;
            throw new Error('Token not found!');
        }

    } catch (err) {
        console.error('Error in authentication :: ', err);
        if(!error){
            error = errorCodes.INVALID_TOKEN;
        }
        res.status(401).send({
            status: 0,
            errorMessage: error
        })
    }







}

module.exports = { handleGoogleAuthenticationRequest }