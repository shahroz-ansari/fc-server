const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String
    },
    adminId: {
        type: mongoose.ObjectId
    },
    picUrl: {
        type: String
    },
    groupFcId: {
        type: String,
        required: true
    },
    users: [mongoose.ObjectId]
}, {
    timestamps: true
});

module.exports = mongoose.model('groups', groupSchema);