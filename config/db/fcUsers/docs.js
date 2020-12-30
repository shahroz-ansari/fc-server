module.exports = [
    {
        _id: 'userA:'+ Date.now(),
        userFcId: 'userA',
        firstName: 'userA',
        lastName: 'lastuserA',
        picture: 'https://picsum.photos/200',
        connections: ['userB', 'userC'],
    },
    {
        _id: 'userB:'+ Date.now(),
        userFcId: 'userB',
        firstName: 'userB',
        lastName: 'lastuserB',
        picture: 'https://picsum.photos/200',
        connections: ['userC', 'userA']
    },
    {
        _id: 'userC:'+ Date.now(),
        userFcId: 'userC',
        firstName: 'userC',
        lastName: 'lastuserC',
        picture: 'https://picsum.photos/200',
        connections: ['userB']
    },
    {
        _id: 'userD:'+ Date.now(),
        userFcId: 'userD',
        firstName: 'userD',
        lastName: 'lastuserD',
        picture: 'https://picsum.photos/200',
        connections: ['userB']
    },
    {
        _id: 'userE:'+ Date.now(),
        userFcId: 'userE',
        firstName: 'userE',
        lastName: 'lastuserE',
        picture: 'https://picsum.photos/200',
        connections: []
    },
    {
        _id: 'userF:'+ Date.now(),
        userFcId: 'userF',
        firstName: 'userF',
        lastName: 'lastuserF',
        picture: 'https://picsum.photos/200',
        connections: []
    },
    {
        _id: 'userG:'+ Date.now(),
        userFcId: 'userG',
        firstName: 'userG',
        lastName: 'lastuserG',
        picture: 'https://picsum.photos/200',
        connections: []
    },
    {
        _id: 'userH:'+ Date.now(),
        userFcId: 'userH',
        firstName: 'userH',
        lastName: 'lastuserH',
        picture: 'https://picsum.photos/200',
        connections: []
    },
    {
        _id: 'userI:'+ Date.now(),
        userFcId: 'userI',
        firstName: 'userI',
        lastName: 'lastuserI',
        picture: 'https://picsum.photos/200',
        connections: []
    }
]