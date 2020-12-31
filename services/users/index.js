const CouchDB = require("../../config/db");
const { getUserFcId, generatePasswordHash } = require("../../utils/app");

class UsersDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    async getUsers() {
        return this.get('/_all_docs');
    }

    async createNewUser(username) {
        return new Promise(async (resolve, reject) => {
            if (!username) {
                reject(new Error('username is required.'))
                return;
            }
            const userFcId = getUserFcId(username);
            // get user by userFcId
            let user = await this.get(`/org.couchdb.user:${userFcId}`);

            // failed to get user
            if (user.error && user.error !== 'not_found') {
                console.log(user);
                reject(new Error('Failed to fetch user.'))
                return;
            }

            // user already exist
            if (user && !user.error) {
                resolve(user);
                return;
            }

            // create a new user
            const password = generatePasswordHash(userFcId);
            user = await this.put(`/org.couchdb.user:${userFcId}`, {
                name: userFcId,
                username,
                type: 'user',
                roles: ['user'],
                password
            })
            // reject if failed creating new user.
            if (user.error) {
                console.log(user);
                reject(new Error('User not created.'));
                return;
            }
            // fetch newly created user
            user = await this.get(`/${user.id}`);
            if (user.error) {
                console.log(user);
                reject(new Error('Unable to read newly created user.'));
                return;
            }
            // resolve user created successfully
            resolve(user);
        })
    }
}

module.exports = new UsersDB('_users');