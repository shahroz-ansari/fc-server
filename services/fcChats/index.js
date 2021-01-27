const CouchDB = require("../../config/db");

class FcChatDB extends CouchDB {
    constructor(groupId, userFcId) {
        super(`chat_${groupId}`, false)
        this.userFcId = userFcId
    }

    async createDatabase() {
        return new Promise(async (resolve, reject) => {
            const db = await this.put('');
            if (db.error) {
                reject(db)
                return;
            }
            try {
                const security = await this.grantDbAccess(true);
                if (security.error) {
                    reject(security);
                    return;
                }
            } catch (err) {
                reject(err)
                return;
            }
            resolve(db);
        })
    }

    async grantDbAccess(init = false) {
        return new Promise(async (resolve, reject) => {
            let doc, response;
            if (!init) {
                doc = await this.get('/_security')
                doc["members"]["names"] = doc["members"]["names"].concat(this.userFcId);
            } else {
                doc = {
                    "admins": { "names": [], "roles": ["admin"] },
                    "members": { "names": [this.userFcId], "roles": [] }
                }
            }

            response = await this.put('/_security', doc)
            if (response.error) {
                reject(response);
                return;
            }
            resolve(response)
        })
    }

    revokeDbAccess() {
        
    }
}

module.exports = FcChatDB;