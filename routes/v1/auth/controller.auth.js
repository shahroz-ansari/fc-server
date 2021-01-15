const { invalidToken, tokenNotFound, databaseError } = require('../../../const/responseCodes');
const { googleAuthService, usersDB, fcUsersDB } = require('../../../services');
const { generatePasswordHash, getUserFcId } = require('../../../utils/app');
const { getSyncGatawayCreds } = require('../../../utils/db');
const FcError = require('../../../utils/error');


// handles google user authentication using token provided from frontend
// return a authToken to be used for logged in users
const handleGoogleAuthenticationRequest = async (req, res) => {

    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer')) throw new FcError(tokenNotFound, 400);
        const idToken = token.split(' ')[1];
        if (!idToken) throw new FcError(tokenNotFound, 400);

        //getting user profile details from google service

        const payload = await googleAuthService.verify(idToken);
        if (!payload) throw new FcError(invalidToken, 400);
        const { email, picture, firstName, lastName } = payload;
        if (!email) throw new FcError(invalidToken, 400);

        const userFcId = getUserFcId(email);

        //getting user from _users db using userFcId
        let user = await usersDB.getUserById(userFcId);

        //if user is not found creating a new user
        if (!user || user.error === 'not_found') {
            user = await usersDB.createNewUser(userFcId, email);
            if (!user || user.error) {
                console.error('errror in create new _user', user);
                throw new FcError(databaseError, 404);
            }
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
            const newfcUser = await fcUsersDB.addFcUser(userFcId, userData);
            if (!newfcUser || newfcUser.error) {
                console.error('errror in create new fcuser', newfcUser);

                // To do : delete user from _users db
                throw new FcError(databaseError, 404);
            }
        }
        const syncGatewayCreds = getSyncGatawayCreds(user.name, generatePasswordHash(userFcId));
        const data =
        {
            ...syncGatewayCreds,
            userFcId,
            userName: email,
            firstName,
            lastName,
        }
        res.locals.send(data);

    } catch (err) {
        if (err instanceof FcError) {
            res.locals.error(err);
        }
        else {
            console.error('error in database operation', err);
            res.locals.error({ message: databaseError, status: 404 })
        }
    }

}


module.exports = { handleGoogleAuthenticationRequest }