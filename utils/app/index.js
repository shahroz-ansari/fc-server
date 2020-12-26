module.exports = {
    getUserFcId: function(username) {
        if (username.includes('@')) {
            return username.split('@')[0]
        }
        return username;
    }
}