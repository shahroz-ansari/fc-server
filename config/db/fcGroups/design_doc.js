module.exports = [
    {
        "_id": "_design/auth",
        "language": "javascript",
        "validate_doc_update": String(
            function(newDoc, oldDoc, userCtx) {
                if (!newDoc.title) {
                    throw({forbidden: 'title is required'});
                }

                if (!newDoc.adminId) {
                    throw({forbidden: 'adminId is required'});
                }

                if (!Array.isArray(newDoc.users)) {
                    throw({forbidden: 'users is required'});
                }

                // if duplicates exist in users
                if (newDoc.users.some( function(e,i,a) { return a.indexOf(e) !== i}) ) {
                    throw ({ forbidden: 'duplicate users not allowed' })
                }

                // if oldDoc not exist treat newDoc as oldDoc
                const doc = oldDoc || newDoc

                // can't transfer admin rights to other user
                if (newDoc.adminId !== doc.adminId) {
                    throw({forbidden: 'can\'t transfer admin rights'});
                }

                if (newDoc.users.indexOf(doc.adminId) < 0) {
                    throw({forbidden: 'users must contain admin id'});
                }

                // server admin can perform any action
                if (userCtx.roles.indexOf('_admin') !== -1){
                    return;
 
                // if user is group admin
                } else if (userCtx.name === doc.adminId) {
                    return;

                // if user is member of group
                } else if (doc.users.indexOf(userCtx.name) > -1) {
                    // can't delete group
                    if (newDoc._deleted === true) {
                        throw({forbidden: 'only admin may delete group'});
                    }

                    // can't modify group members
                    if (
                        !doc.users.every(function(element) { return newDoc.users.indexOf(element) > -1 }) ||
                        doc.users.length !== newDoc.users.length
                    ) {
                        throw ({ forbidden: 'only group admin can add members'})
                    }

                } else {
                    throw ({ forbidden: 'only group admin and members can write'})
                }
            }
        )
    },
    {
        "_id": "_design/groups",
        "language": "javascript",
        "filters": {
            'only_mine': String(
                function(doc, req) {
                    if(Array.isArray(doc.users) && doc.users.indexOf(req['userCtx']['name']) > -1) {
                        return true
                    }
                    return false
                }
            )
        }
    }
    
]