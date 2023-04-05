const express = require('express');
const displaySettingsController = require('../Controllers/displaySettingsController');

const router = express.Router();

// Get all display settings
router.get('/', displaySettingsController.getAll);

// Get a single display setting by ID
router.get('/:id', displaySettingsController.getById);

// Create a new display setting
router.post('/', displaySettingsController.create);

// Update an existing display setting
router.put('/:id', displaySettingsController.update);

// Delete a display setting by ID
router.delete('/:id', displaySettingsController.deleteById);

module.exports = router;
