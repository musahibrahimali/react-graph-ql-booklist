const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define a book schema
const BookSchema = new Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: true
});

// create a new model
const Book = mongoose.model('Book', BookSchema);

// export the model
module.exports = Book;