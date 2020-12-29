class FcError extends Error {
    constructor (message, status) {
        super(message)
    
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name
        this.status = status || 500
    
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = FcError