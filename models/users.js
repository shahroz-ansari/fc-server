const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    picUrl: {
        type: String
    },
    userFcId: {
        type: String,
        required: true
    },
    groups: [mongoose.ObjectId],
    friends: [mongoose.ObjectId]
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);