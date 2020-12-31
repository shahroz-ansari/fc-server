const CouchDB = require("../../config/db");

class FcUsersDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    getFcUserById(userFcId) {
        return new Promise(async (resolve, reject) => {
            if (!userFcId) {
                reject(new Error('userFcId is required.'))
                return;
            }

            let user = await this.get(`/fcuser::${userFcId}`);
            resolve(user);
        })
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

            const newFcUser = await this.put(`/fcuser::${userFcId}`, fcUser);
            
            resolve(newFcUser);
        })
    }
}

module.exports = new FcUsersDB('fc_users');