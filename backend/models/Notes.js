const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the notes model to be used in server database as a collection
const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        required: true,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// name of the collection is 'notes'
module.exports = mongoose.model('notes', notesSchema);