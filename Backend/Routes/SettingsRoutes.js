const express = require('express');
const router = express.Router();
const settingsController = require('../Controllers/SettingsController');

// Définition des routes pour les paramètres
router.post('/', settingsController.addSettings);
router.get('/', settingsController.getSettings);
router.delete('/:id', settingsController.deleteSettings);
router.put('/:id', settingsController.updateSettings);

module.exports = router;