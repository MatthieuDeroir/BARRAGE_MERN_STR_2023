const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

// Get all users
router.get('/', userController.getAll);

// Get a single user by ID
router.get('/:id', userController.getById);

// Create a new user
router.post('/', userController.create);

// Update an existing user
router.put('/:id', userController.update);

// Delete a user by ID
router.delete('/:id', userController.deleteById);

module.exports = router;
