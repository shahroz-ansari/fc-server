module.exports = [
    {
        "_id": "_design/auth",
        "language": "javascript",
        "validate_doc_update": String(
            function(newDoc, oldDoc, userCtx) {
                // only server admin can write
                if (userCtx.roles.indexOf('_admin') !== -1) { return; }
                else { throw ({ forbidden: 'Unauthorized Access' });}
            }
        )
    },
    {
        "_id": "_design/friends",
        "language": "javascript",
        "filters": {
            'only_mine': String(
                function(doc, req) {
                    if(Array.isArray(doc.friendOf) && doc.friendOf.indexOf(req['userCtx']['name']) > -1) {
                        return true
                    }
                    return false
                }
            )
        }
    }
]