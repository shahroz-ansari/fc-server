const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    picUrl: {
        type: String
    },
    userFcId: {
        type: String,
        required: true,
        unique: true
    },
    groups: [mongoose.ObjectId],
    friends: [mongoose.ObjectId],
    authToken: {
        type: String
    },
    verifiedBy: {
        type: String,
        enum: ['google','facebook']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);