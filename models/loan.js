const mongoose = require('mongoose');

// Loan schema
const loanSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loaned_on: {
    type: Date,
    default: Date.now,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  returned_on: Date // null until book is returned
});

// Create a model from the schema
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
