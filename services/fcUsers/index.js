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
                userFcId: userFcId,
                connections: [userFcId]
            }

            const newFcUser = await this.put(`/fcuser::${userFcId}`, fcUser);

            resolve(newFcUser);
        })
    }

    updateFcUser(fcUser) {
        return new Promise(async (resolve, reject) => {
            if (!fcUser._id || !fcUser._rev || !fcUser.userFcId) {
                reject(new Error('Missing fileds in fcUser'));
            }

            const updatedFcUser = await this.put(`/fcuser::${fcUser.userFcId}`, fcUser)

            resolve(updatedFcUser);
        })
    }
}

module.exports = new FcUsersDB('fc_users');