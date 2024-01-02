const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const user = await userService.authenticateUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    // Distinguish between not found and incorrect password
    if (error.message === 'User not found!' || error.message === 'Password is incorrect!'){
        res.status(401).json({ message: error.message });
    } else {
        res.status(500).json({ message: error.message });
    }
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
