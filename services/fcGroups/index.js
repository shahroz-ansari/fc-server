const CouchDB = require("../../config/db");

class FcGroupsDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    getGroupById(groupId) {
        return new Promise(async (resolve, reject) => {
            if (!groupId) {
                reject(new Error('groupId is required.'))
                return;
            }

            const fcGroup = await this.get(`/${groupId}`);
            resolve(fcGroup);
        })
    }
}

module.exports = new FcGroupsDB('fc_groups');