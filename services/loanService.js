const express = require('express');
const loanService = require('../services/loanService');
const router = express.Router();

// Create a new loan
router.post('/', async (req, res) => {
  try {
    const loan = await loanService.createLoan(req.body);
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get loan by ID
router.get('/:id', async (req, res) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);
    res.status(200).json(loan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update loan details (like returning a book)
router.put('/:id', async (req, res) => {
  try {
    const updatedLoan = await loanService.updateLoan(req.params.id, req.body);
    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
