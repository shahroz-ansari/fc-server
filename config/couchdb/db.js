const fetch = require("node-fetch");

function generateDbUrl(dbName) {
    const {
        COUCH_DB_PROTOCOL,
        COUCH_DB_HOST,
        COUCH_DB_PORT,
        COUCH_DB_USERNAME,
        COUCH_DB_PASSWORD
    } = process.env
    return `${COUCH_DB_PROTOCOL}://${COUCH_DB_USERNAME}:${COUCH_DB_PASSWORD}@${COUCH_DB_HOST}:${COUCH_DB_PORT}/${dbName}`
}

class DB {
    constructor(dbName) {
        this.url = generateDbUrl(dbName);
    }

    async get(path) {
        try {
            const resp = await fetch(this.url + path, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            return resp.json();
        } catch(err) {
            console.log(err);
            return {
                error: err.message,
            };
        }
    }

    async put(path, data) {
        try {
            const resp = await fetch(this.url + path, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            return resp.json();
        } catch(err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }
}

module.exports = DB



