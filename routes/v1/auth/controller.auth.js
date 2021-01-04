const { invalidToken, tokenNotFound, databaseError } = require('../../../const/responseCodes');
const { googleAuthService, usersDB, fcUsersDB } = require('../../../services');
const { generatePasswordHash, getUserFcId } = require('../../../utils/app');
const utils = require('../../../utils/app');


// handles google user authentication using token provided from frontend
// return a authToken to be used for logged in users
const handleGoogleAuthenticationRequest = async (req, res) => {

    const token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        const idToken = token.split(' ')[1];
        if (!idToken) {
            res.locals.error(tokenNotFound,400);
        } else {
            //getting user profile details from google service
            const { email, picture, firstName, lastName } = await googleAuthService.verify(idToken);
            if (!email) {
                res.locals.error(invalidToken,400);
            } else {
                try {
                    const userFcId = getUserFcId(email);
                    const { COUCH_DB_PROTOCOL, COUCH_DB_HOST, COUCH_DB_PORT } = process.env;

                    //getting user from _users db using userFcId
                    let user = await usersDB.getUserById(userFcId);

                    //if user is not found creating new user
                    if (!user || user.error === 'not_found') {
                        user = await usersDB.createNewUser(userFcId, email);
                    }

                    //getting fcUser from fc_users db
                    let fcUser = await fcUsersDB.getFcUserById(userFcId);

                    //if fcUser is not found creating new fcUser
                    if (!fcUser || fcUser.error === 'not_found') {
                        const userData = {
                            firstName,
                            lastName,
                            picture
                        }
                        await fcUsersDB.addFcUser(userFcId, userData);
                    }
                    const password = generatePasswordHash(userFcId);
                    const data =
                    {
                        userFcId,
                        userName: email,
                        firstName,
                        lastName,
                        syncGatewayProtocol: COUCH_DB_PROTOCOL,
                        syncGatewayHost: COUCH_DB_HOST,
                        syncGatewayPort: COUCH_DB_PORT,
                        syncGatewayUser: user.name,
                        syncGatewayPass: password
                        // token
                    }
                    res.locals.send(data);
                } catch (err) {
                    console.error('error in database operation', err);
                    res.locals.error(databaseError);
                }
            }
        }

    } else {
        res.locals.error(tokenNotFound,400);
    }
}


module.exports = { handleGoogleAuthenticationRequest }