const CouchDB = require("../../config/db");
const { v4 } = require("uuid");

class FcUsersDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    addNewUser(user) {
        // validate user data
        return this.put(`${user.userFcId}:${v4()}`, user);
    }
}

module.exports = new FcUsersDB('fc_users');