const { v4: uuidV4 } = require('uuid');
const md5 = require('md5');
const User = require('../../../models/users');

// @desc 
// checks if user with userName is present in database
// if yes updates authToken, if no save a new user
// return new authToken 
const saveOrUpdateUser = function(userName, firstName, lastName, picUrl, verifiedBy){
    return new Promise((resolve, reject) => {
        if (!userName) reject('No userName passed');
        User.findOne({ userName }).then(user => {
            let authToken = uuidV4();
            if (!user) {
                const newUser = new User({ userName, firstName, lastName, picUrl, verifiedBy });
                newUser.userFcId = md5(userName);
                newUser.authToken = authToken;
                newUser.save().then(() => resolve(authToken));
            } else {
                user.authToken = authToken;
                user.save().then(() => resolve(authToken));
            }
        }).catch(err => {
            reject(err)
        });
    });

}



module.exports = { saveOrUpdateUser }