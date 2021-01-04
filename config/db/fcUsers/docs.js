const { getUserFcId } = require("../../../utils/app");

module.exports = [
    {
        _id: 'fcuser::' + getUserFcId('userA@gmail.com'),
        userFcId: getUserFcId('userA@gmail.com'),
        firstName: 'userA',
        lastName: 'lastuserA',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userA@gmail.com'), getUserFcId('userB@gmail.com'), getUserFcId('userC@gmail.com')],
    },
    {
        _id: 'fcuser::' + getUserFcId('userB@gmail.com'),
        userFcId: getUserFcId('userB@gmail.com'),
        firstName: 'userB',
        lastName: 'lastuserB',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userB@gmail.com'), getUserFcId('userC@gmail.com'), getUserFcId('userA@gmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userC@gmail.com'),
        userFcId: getUserFcId('userC@gmail.com'),
        firstName: 'userC',
        lastName: 'lastuserC',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userC@gmail.com'), getUserFcId('userB@gmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userD@gmail.com'),
        userFcId: getUserFcId('userD@gmail.com'),
        firstName: 'userD',
        lastName: 'lastuserD',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userD@gmail.com'), getUserFcId('userB@gmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userE@gmail.com'),
        userFcId: getUserFcId('userE@gmail.com'),
        firstName: 'userE',
        lastName: 'lastuserE',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userE@gmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userF@gmail.com'),
        userFcId: getUserFcId('userF@gmail.com'),
        firstName: 'userF',
        lastName: 'lastuserF',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userF@gmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userG@gmail.com'),
        userFcId: getUserFcId('userG@gmail.com'),
        firstName: 'userG',
        lastName: 'lastuserG',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userGgmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userH@gmail.com'),
        userFcId: getUserFcId('userH@gmail.com'),
        firstName: 'userH',
        lastName: 'lastuserH',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('userH@gmail.com')]
    },
    {
        _id: 'fcuser::' + getUserFcId('userI@gmail.com'),
        userFcId: getUserFcId('userI@gmail.com'),
        firstName: 'userI',
        lastName: 'lastuserI',
        picture: 'https://picsum.photos/200',
        connections: [getUserFcId('useri@gmail.com')]
    }
]