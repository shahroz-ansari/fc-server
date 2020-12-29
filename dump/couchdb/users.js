const DB = require("./db");
const md5 = require("md5");
 
class UsersDB {
    db = new DB('_users')

    async getUsers() {
        return this.db.get('/_all_docs');
    }

    async getUserByName(name) {
        return this.db.get('/org.couchdb.user:' + name);
    }

    async createNewUser(name) {
        return this.db.put(`/org.couchdb.user:${name}`, {
            name,
            password: md5(name),
            roles: ['user'],
            type: 'user',
            friends: [],
            groups: []
        })
    }
}

module.exports = new UsersDB();