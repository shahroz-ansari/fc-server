const PouchDB = require('pouchdb');
const pouchRouter = require('express-pouchdb');

const DB_DIR = './db/'
const pouchHandle = pouchRouter(PouchDB.defaults({
    prefix: DB_DIR
}), {
    logPath: DB_DIR + 'log.txt'
});

module.exports = pouchHandle