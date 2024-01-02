const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isbn: String,
  summary: String,
  added_by: mongoose.Schema.Types.ObjectId,
  added_at: { type: Date, default: Date.now }
});

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
