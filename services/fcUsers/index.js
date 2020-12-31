const CouchDB = require("../../config/db");
const { v4 } = require("uuid");

class FcUsersDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    // @user should contain firstName or lastName
    addFcUser(userFcId, user) {
        return new Promise(async (resolve, reject) => {
            if (!userFcId) {
                reject(new Error('userFcId is required.'))
                return;
            }

            if (!(user.firstName || user.lastName)) {
                reject(new Error('firstName or lastName is required.'))
                return;
            }

            const fcUser = {
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                picture: user.picture || '',
                connections: [userFcId]
            }

            const resp = await this.put(`/fcuser::${userFcId}`, fcUser);
            
            if (resp.error) {
                reject(new Error(resp.error));
                return;
            }
            resolve(resp);
        })
    }
}

module.exports = new FcUsersDB('fc_users');