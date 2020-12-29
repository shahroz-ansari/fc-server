const mongoose = require('mongoose');

const connect = function () {
    const { MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME } = process.env

    mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.j7stb.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    mongoose.connection.on('error', function (err) {
        console.log('MongoDB Connection Error:', err);
    })

    mongoose.connection.on('open', function () {
        console.log('MongoDB Connection Opened.');
    })

    mongoose.connection.on('close', function () {
        console.log('MongoDB Conection Closed.')
    }) 
}

module.exports = connect;