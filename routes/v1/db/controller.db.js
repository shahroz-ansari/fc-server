const { v4: uuidv4 } = require('uuid');
const { requiredFieldsMissing, databaseError, userNotFound, groupNotFound, notAuthorized, userAlreadyPresendInGroup, invitationAlreadyPresent, requesterAndUserCantBeSame } = require('../../../const/responseCodes');
const { fcUsersDB, fcGroupsDB, FcChatDB } = require('../../../services');
const FcError = require('../../../utils/error');


// Add invitation in fc_user db 
const addInvitation = async (req, res) => {
    try {
        const { userFcId, groupId, requester } = req.body;

        if (!userFcId || !groupId || !requester) {
            throw new FcError(requiredFieldsMissing, 404);
        }

        if (userFcId === requester) {
            throw new FcError(requesterAndUserCantBeSame, 404)
        }

        const fcUser = await fcUsersDB.getFcUserById(userFcId);
        if (!fcUser || fcUser.error === 'not_found') {
            throw new FcError(userNotFound, 404);
        }

        const admin = await fcUsersDB.getFcUserById(requester);
        if (!admin || admin.error === 'not_found') {
            throw new FcError(userNotFound, 404);
        }

        const fcGroup = await fcGroupsDB.getGroupById(groupId);
        if (!fcGroup || fcGroup.error === 'not_found') {
            throw new FcError(groupNotFound, 404);
        }

        //checking if requester is authorized
        if (fcGroup.adminId !== requester) {
            throw new FcError(notAuthorized, 401)
        }

        //checking if user is already present in group
        if (fcGroup.users.includes(userFcId)) {
            throw new FcError(userAlreadyPresendInGroup, 404);
        }

        //checking if similar invitation is already present
        if (fcUser.invitations && Array.isArray(fcUser.invitations)) {
            fcUser.invitations.forEach(_invitation => {
                if (_invitation.groupId === groupId) {
                    throw new FcError(invitationAlreadyPresent, 404)
                }
            })
        }

        const invitation = {
            invitedBy: admin.firstName,
            requester: requester,
            groupTitle: fcGroup.title,
            groupId: groupId,
            invitationId: uuidv4()
        }

        if (!fcUser.invitations || !Array.isArray(fcUser.invitations)) {
            fcUser.invitations = [invitation];
        } else {
            fcUser.invitations = fcUser.invitations.concat(invitation);
        }

        const result = await fcUsersDB.updateFcUser(fcUser);
        if (!result || result.error) {
            throw new FcError(databaseError, 404);
        }
        res.locals.send("successfully sent invitation");


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

const handleNewGroup = async (req, res) => {
    try {
        const { userFcId, groupId } = req.body;
        if (!userFcId || !groupId) {
            throw new FcError(requiredFieldsMissing, 404);
        }

        //checking if user exist with userFcId
        const fcUser = await fcUsersDB.getFcUserById(userFcId);
        if (!fcUser || fcUser.error === 'not_found') {
            throw new FcError(userNotFound, 404);
        }

        //checking if group exist with groupId
        const fcGroup = await fcGroupsDB.getGroupById(groupId);
        if (!fcGroup || fcGroup.error === 'not_found') {
            throw new FcError(groupNotFound, 404);
        }
        
        const fcChatDb = new FcChatDB(groupId, userFcId);
        await fcChatDb.createDatabase();

        res.locals.send('ok');
    } catch (err) {
        res.locals.error(err)
    }
}

module.exports = { addInvitation, handleNewGroup }