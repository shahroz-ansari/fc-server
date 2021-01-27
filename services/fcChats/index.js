const CouchDB = require("../../config/db");

class FcChatDB extends CouchDB {
    constructor(dbName) {
        super(dbName)
    }

    //update _security of groupChat
    updateChatDBSecurity(fcUserId) {
        return new Promise(async (resolve, reject) => {
            if (!fcUserId) {
                reject(new Error('fcUserId is required'));
                return;
            }
            let chatDbSecurity = await this.get('_security');

            if (chatDbSecurity && chatDbSecurity.members && chatDbSecurity.members.names && Array.isArray(chatDbSecurity.members.names)) {
                chatDbSecurity["members"]["names"] = chatDbSecurity.members.names.concat(fcUserId);
            } else {
                chatDbSecurity = {
                    "admins": {
                        "names": [fcUserId],
                        "roles": ["admin"]
                    },
                    "members": {
                        "names": [fcUserId],
                        "roles": []
                    }
                }
            }
            const response = await this.put('/_security', chatDbSecurity);
            resolve(response);
        })
    }
}

module.exports = FcChatDB;