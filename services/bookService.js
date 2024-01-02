const Book = require('../models/book');

// Service to add a book
const addBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

// Service to get a single book by ID
const getBookById = async (id) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error('Book not found!');
  }
  return book;
};

// Service to update a book
const updateBook = async (id, updateData) => {
  const book = await Book.findByIdAndUpdate(id, updateData, { new: true });
  if (!book) {
    throw new Error('Book not found!');
  }
  return book;
};

// Service to delete a book
const deleteBook = async (id) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new Error('Book not found!');
  }
  return book;
};

module.exports = {
  addBook,
  getBookById,
  updateBook,
  deleteBook
};