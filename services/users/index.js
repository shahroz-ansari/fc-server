const CouchDB = require("../../config/db");
const { getUserFcId, generatePasswordHash } = require("../../utils/app");

class UsersDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    async getUsers() {
        return this.get('/_all_docs');
    }

    async getUserById(userFcId) {
        return new Promise(async (resolve, reject) => {
            if (!userFcId) {
                reject(new Error('userFcId is required.'))
                return;
            }

            let user = await this.get(`/org.couchdb.user:${userFcId}`);
            resolve(user);
        })
    }

    async createNewUser(userFcId, username) {
        return new Promise(async (resolve, reject) => {
            if (!username || !userFcId) {
                reject(new Error('username and userFcId is required.'))
                return;
            }

            const password = generatePasswordHash(userFcId);
            const user = await this.put(`/org.couchdb.user:${userFcId}`, {
                name: userFcId,
                username,
                type: 'user',
                roles: ['user'],
                password
            });
            resolve(user);
        })
    }
}

module.exports = new UsersDB('_users');