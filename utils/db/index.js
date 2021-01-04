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

const getSyncGatawayCreds = function(username,password){
    const { COUCH_DB_PROTOCOL, COUCH_DB_HOST, COUCH_DB_PORT } = process.env;
    return {
        syncGatewayProtocol: COUCH_DB_PROTOCOL,
        syncGatewayHost: COUCH_DB_HOST,
        syncGatewayPort: COUCH_DB_PORT,
        syncGatewayUser: username,
        syncGatewayPass: password
    }
}

module.exports = {
    generateDbUrl,
    getSyncGatawayCreds
}