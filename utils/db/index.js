const generateDbUrl = function(dbName) {
    const {
        COUCH_DB_PROTOCOL,
        COUCH_DB_HOST,
        COUCH_DB_PORT,
        COUCH_DB_USERNAME,
        COUCH_DB_PASSWORD
    } = process.env
    return `${COUCH_DB_PROTOCOL}://${COUCH_DB_USERNAME}:${COUCH_DB_PASSWORD}@${COUCH_DB_HOST}:${COUCH_DB_PORT}/${dbName}`
}

module.exports = {
    generateDbUrl
}