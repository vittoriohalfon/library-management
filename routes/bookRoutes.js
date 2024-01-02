const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');

// POST endpoint to add a new book
router.post('/', async (req, res) => {
  try {
    const savedBook = await bookService.addBook(req.body);
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to retrieve a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PUT endpoint to update a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE endpoint to delete a book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.id);
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;