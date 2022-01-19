const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create an author schema
const AuthorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, reqquired: true }
}, {
    timestamps: true
});

// create a book model
const Author = mongoose.model('Author', AuthorSchema);

// export the model
module.exports = Author;
