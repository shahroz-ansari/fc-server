const fetch = require('node-fetch')

const _fcUsersDesign = require('./fcUsers/design_doc')
const _fcGroupsDesign = require('./fcGroups/design_doc')
const _usersInitialDocs = require('./users/docs')
const _fcUsersInitialDocs = require('./fcUsers/docs')
const _fcGroupsInitialDocs = require('./fcGroups/docs')
const { generateDbUrl } = require('../../utils/db')

const designMap = {
    'fc_users': _fcUsersDesign,
    'fc_groups': _fcGroupsDesign
}

const membersRolesMap = {
    'fc_users': ['user'],
    'fc_groups': ['user']
}

const initalDocsMap = {
    '_users': _usersInitialDocs,
    'fc_users': _fcUsersInitialDocs,
    'fc_groups': _fcGroupsInitialDocs
}

class CouchDB {
    dbURL;
    dbName;

    constructor(dbName) {
        this.dbName = dbName;
        this.dbURL = generateDbUrl(dbName);

        this.dbInit();
    }

    async dbInit() {
        // check if db exist or create a new one.
        this.dbName !== '_users' && await this.createDatabase();
        this.dbName !== '_users' && await this.updateDBSecurity();
        this.dbName !== '_users' && this.updateDesignDocument();

        if (process.env.COUCH_DB_LOAD_DOCS === 'YES') {
            // just to make sure all design docs are uploaded
            setTimeout(() => {
                this.uploadInitalDocs();
            }, 3000)
        }

    }

    async createDatabase() {
        const db = await this.get('');
        if (db.error && db.error === 'not_found') {
            await this.put('')
            // @LOG if db create failed.
        }
    }

    async updateDBSecurity() {
        await this.put('/_security', {
            "admins": {
                "names": [],
                "roles": ["admin"]
            },
            "members": {
                "names": [],
                "roles": membersRolesMap[this.dbName]
            }
        })
    }

    // design doc only get update when project started using env COUCH_DB_UPDATE_DESIGN_DOC=YES
    async updateDesignDocument() {
        designMap[this.dbName].map(async doc => {
            const designDoc = await this.get(`/${doc._id}`);
            if (designDoc.error && designDoc.error === 'not_found') {
                await this.put(`/${doc._id}`, doc);
            } else if (!designDoc.error && process.env.COUCH_DB_UPDATE_DESIGN_DOC === 'YES') {
                doc._rev = designDoc._rev
                await this.put(`/${doc._id}`, doc);
            }
        })
    }

    async uploadInitalDocs() {
        console.log('Loading docs...', this.dbName)
        const uploadedDocs = await this.post('/_bulk_docs', {
            docs: initalDocsMap[this.dbName]
        })
        if (uploadedDocs.error) {
            console.log('Docs Upload failed', uploadedDocs);
        }
    }

    async get(path) {
        if (typeof path !== 'string') return null;
        try {
            const resp = await fetch(this.dbURL + path, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            return resp.json();
        } catch (err) {
            console.log(err);
            return {
                error: err.message,
            };
        }
    }

    async put(path, data = {}) {
        try {
            const resp = await fetch(this.dbURL + path, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            return resp.json();
        } catch (err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }

    async post(path, data = {}) {
        try {
            const resp = await fetch(this.dbURL + path, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            return resp.json();
        } catch (err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }
}

module.exports = CouchDB