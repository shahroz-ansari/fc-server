const FcError = require("../utils/error")
const { internalServerError } = require("../const/responseCodes")

module.exports = function responseHandler(req, res, next) {
    res.locals.send = function(data, meta = null) {
        res.status(200).json({
            success: true,
            data,
            meta
        })
    }
    res.locals.error = function (error) {
        if (process.env.ENVIRONMENT === 'development') {
            console.log(error)
        } else {
            // @log to a file
        }
        let message = error.message
        if (!error instanceof FcError) {
            message = internalServerError
        }
        
        res.status(error.status || 500).json({
            success: false,
            error: message
        })
    }
    next()
}