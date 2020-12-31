const encryption = require("../encryption");

module.exports = {
    getUserFcId: function(username) {
        if(!username) throw new Error('username required.');
        if (username.includes('@')) {
            username = username.split('@')[0]
        }
        return encryption.createHash(username);
    },
    generatePasswordHash: function(password) {
        if(!password) throw new Error('password required.');
        return encryption.createHash(password + process.env.PASSWORD_SECRET);
    }
}