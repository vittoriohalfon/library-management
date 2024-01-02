require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/book');

// MongoDB connection string
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Dummy Data
const books = [
  { title: 'Book Title 1', author: 'Author 1', genre: 'Genre 1', isbn: '123456', summary: 'Summary 1' },
  { title: 'Book Title 2', author: 'Author 2', genre: 'Genre 2', isbn: '234567', summary: 'Summary 2' },
  { title: 'Book Title 3', author: 'Author 3', genre: 'Genre 3', isbn: '345678', summary: 'Summary 3' },
  { title: 'Book Title 4', author: 'Author 4', genre: 'Genre 4', isbn: '456789', summary: 'Summary 4' },
  { title: 'Book Title 5', author: 'Author 5', genre: 'Genre 3', isbn: '567890', summary: 'Summary 5' },
  { title: 'Book Title 6', author: 'Author 6', genre: 'Genre 3', isbn: '678901', summary: 'Summary 6' },
  { title: 'Book Title 7', author: 'Author 7', genre: 'Genre 3', isbn: '789012', summary: 'Summary 7' },
  { title: 'Book Title 8', author: 'Author 8', genre: 'Genre 1', isbn: '890123', summary: 'Summary 8' },
  { title: 'Book Title 9', author: 'Author 9', genre: 'Genre 5', isbn: '901234', summary: 'Summary 9' },
  { title: 'Book Title 10', author: 'Author 10', genre: 'Genre 1', isbn: '012345', summary: 'Summary 10' }
];

// Function to insert dummy data into the database
async function populateDummyData() {
  try {
    await Book.insertMany(books);
    console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Failed to insert dummy data:', error.message);
  }
  // Close the database connection when done
  mongoose.connection.close();
}

populateDummyData();
