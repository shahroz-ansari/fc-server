const { requiredFieldsMissing, databaseError, userNotFound } = require('../../../const/responseCodes');
const { fcUsersDB } = require('../../../services');
const { getUserFcId } = require('../../../utils/app');
const FcError = require('../../../utils/error');


// Search user using email id
const searchUserByEmail = async (req, res) => {

    try {
        const email = req.params.email;
        if (!email) throw new FcError(requiredFieldsMissing, 404);
        console.log('email received', email);
        const userFcId = getUserFcId(email);

        const user = await fcUsersDB.getFcUserById(userFcId);
        if (!user || user.error === 'not_found') {
            throw new FcError(userNotFound, 404);
        }
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            userFcId: user.userFcId
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

module.exports = { searchUserByEmail }