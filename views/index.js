const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");
const connectionString = process.env.MONGODBURI
mongoose.connect(
    connectionString, {useNewUrlParser: true, useUnifiedTopology: true}
);

//console connection status
mongoose.connection.on('connected', () => {
    console.log('mongoose connected to', connectionString);
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected from', connectionString);
});
mongoose.connection.on('error', (error) => {
    console.log('mongoose error', error);
});
