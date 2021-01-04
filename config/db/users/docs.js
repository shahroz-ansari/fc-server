const { getUserFcId, generatePasswordHash } = require("../../../utils/app");

module.exports = [
    {
        _id: 'org.couchdb.user:' + getUserFcId('userA@gmail.com'),
        name: getUserFcId('userA@gmail.com'),
        username: 'userA@gmail.com',
        password: generatePasswordHash(getUserFcId('userA@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userB@gmail.com'),
        name: getUserFcId('userB@gmail.com'),
        username: 'userB@gmail.com',
        password: generatePasswordHash(getUserFcId('userB@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userC@gmail.com'),
        name: getUserFcId('userC@gmail.com'),
        username: 'userC@gmail.com',
        password: generatePasswordHash(getUserFcId('userC@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userD@gmail.com'),
        name: getUserFcId('userD@gmail.com'),
        username: 'userD@gmail.com',
        password: generatePasswordHash(getUserFcId('userD@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userE@gmail.com'),
        name: getUserFcId('userE@gmail.com'),
        username: 'userE@gmail.com',
        password: generatePasswordHash(getUserFcId('userE@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userF@gmail.com'),
        name: getUserFcId('userF@gmail.com'),
        username: 'userF@gmail.com',
        password: generatePasswordHash(getUserFcId('userF@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userG@gmail.com'),
        name: getUserFcId('userG@gmail.com'),
        username: 'userG@gmail.com',
        password: generatePasswordHash(getUserFcId('userG@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userH@gmail.com'),
        name: getUserFcId('userH@gmail.com'),
        username: 'userH@gmail.com',
        password: generatePasswordHash(getUserFcId('userH@gmail.com')),
        roles: ['user'],
        type: 'user'
    },
    {
        _id: 'org.couchdb.user:' + getUserFcId('userI@gmail.com'),
        name: getUserFcId('userI@gmail.com'),
        username: 'userI@gmail.com',
        password: generatePasswordHash(getUserFcId('userI@gmail.com')),
        roles: ['user'],
        type: 'user'
    }
]