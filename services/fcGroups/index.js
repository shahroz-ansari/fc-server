const CouchDB = require("../../config/db");

class FcGroupsDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }
}

module.exports = new FcGroupsDB('fc_groups');