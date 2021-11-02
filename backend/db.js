const mongoose = require('mongoose');

const monogoURI = 'mongodb://localhost:27017/cloudNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = () => {
    mongoose.connect(monogoURI, () => {
        console.log("database Connected!");
    });
    console.log("database not connected");
};

module.exports = connectToMongo;