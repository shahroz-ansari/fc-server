const CouchDB = require("../../config/db");
const md5 = require('md5');

class UsersDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    async getUsers() {
        return this.get('/_all_docs');
    }

    async createNewUser(userFcId, username) {
        // validate user
        return this.db.put(`/org.couchdb.user:${userFcId}`, {
            username,
            name: userFcId,
            password: md5(username),
            roles: ['user'],
            type: 'user'
        })
    }
}

module.exports = new UsersDB('_users');