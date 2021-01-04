const { getUserFcId } = require("../../../utils/app");

module.exports = [
    {
        _id: '60ff7f8c-25b8-4e6c-b568-18be9d112573',
        title: 'Group A',
        picture: 'https://picsum.photos/200',
        adminId: getUserFcId('userA@gmail.com'),
        users: [getUserFcId('userA@gmail.com'), getUserFcId('userB@gmail.com'), getUserFcId('userC@gmail.com')]
    },
    {
        _id: '12b2c7bd-3253-452c-8df3-9484ec461b6f',
        title: 'Group B',
        picture: 'https://picsum.photos/200',
        adminId: getUserFcId('userB@gmail.com'),
        users: [getUserFcId('userB@gmail.com'), getUserFcId('userF@gmail.com')]
    },
    {
        _id: 'd1951b7f-bf79-4b6a-8f73-53db747354f4',
        title: 'Group E',
        picture: 'https://picsum.photos/200',
        adminId: getUserFcId('userE@gmail.com'),
        users: [getUserFcId('userE@gmail.com'), getUserFcId('userA@gmail.com'), getUserFcId('userB@gmail.com')]
    },
    {
        _id: 'c01bf36c-8099-4bdf-b193-00d73bb8b7c1',
        title: 'Group F',
        picture: 'https://picsum.photos/200',
        adminId: getUserFcId('userF@gmail.com'),
        users: [getUserFcId('userF@gmail.com')]
    }
]