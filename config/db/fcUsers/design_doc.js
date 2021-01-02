module.exports = [
    {
        "_id": "_design/auth",
        "language": "javascript",
        "validate_doc_update": String(
            function(newDoc, oldDoc, userCtx) {

                if (!newDoc.userFcId) {
                    throw ({forbidden: 'userFcId is required'});
                }

                if (!newDoc.firstName && !newDoc.lastName) {
                    throw ({forbidden: 'firstName or lastName is required'});
                }

                const doc = oldDoc || newDoc;

                // userFcId can't be modified
                if (newDoc.userFcId !== doc.userFcId) {
                    throw({forbidden: 'can\'t update userFcId'});
                }

                // connection must contain his own id
                if (newDoc.connections.indexOf(doc.userFcId) < 0) {
                    throw ({forbidden: 'connections must contain fcUserId'});
                }

                // duplicate connections not allowed
                if (newDoc.connections.some( function(e,i,a) { return a.indexOf(e) !== i}) ) {
                    throw ({ forbidden: 'duplicate connecitons not allowed' })
                }

                // server admin can perform any action
                if (userCtx.roles.indexOf('_admin') !== -1) { 
                    return;
                
                }
                
                // users other than admin can't modify these fields
                if (
                    newDoc._deleted === true
                ) { 
                    throw ({ forbidden: 'only admin can delete' });
                }

                if (
                    (
                        newDoc.firstName !== doc.firstName ||
                        newDoc.lastName !== doc.lastName ||
                        newDoc.picture !== doc.picture
                    ) &&
                    userCtx.name !== doc.userFcId
                ) {
                    throw ({ forbidden: 'only doc owner can update firstName, lastName and picture'})
                }

                // Inserting his fcId
                if (newDoc.connections.length === doc.connections.length + 1) {
                    // make sure not already present
                    if (doc.connections.indexOf(userCtx.name) > -1) {
                        throw ({ forbidden: 'fcId already exist in connections' });
                    }

                    // old ids should be present new newDoc
                    doc.connections.forEach(function(element){
                        if (newDoc.connections.indexOf(element) < 0) {
                            throw ({ forbidden: 'can\'t change other fcIds' });
                        }
                    });

                    // validate id inserted is his own
                    if (newDoc.connections.indexOf(userCtx.name) < 0) {
                        throw ({ forbidden: 'can\'t change other fcIds' })
                    }

                // deleting his fcId
                } else if (newDoc.connections.length === doc.connections.length - 1) {
                    // make sure his id exist
                    if (doc.connections.indexOf(userCtx.name) < 0) {
                        throw ({ forbidden: 'fcId not exists in connecitons' });
                    }

                    // old ids should be present new newDoc accept his own
                    doc.connections.forEach(function(element){
                        if (element !== userCtx.name && newDoc.connections.indexOf(element) < 0) {
                            throw ({ forbidden: 'can\'t change other fcIds' });
                        }
                    });

                // nothing altered
                } else if (newDoc.connections.length === doc.connections.length) {
                    // all fcIds should be there as it is
                    doc.connections.forEach(function(element){
                        if (newDoc.connections.indexOf(element) < 0) {
                            throw ({ forbidden: 'can\'t change other fcIds' });
                        }
                    });

                // any other operation on connections
                } else {
                    throw ({ forbidden: 'access_denied'})
                }
            }
        )
    },
    {
        "_id": "_design/friends",
        "language": "javascript",
        "filters": {
            'only_mine': String(
                function(doc, req) {
                    if(Array.isArray(doc.connections) && doc.connections.indexOf(req['userCtx']['name']) > -1) {
                        return true
                    }
                    return false
                }
            )
        }
    }
]