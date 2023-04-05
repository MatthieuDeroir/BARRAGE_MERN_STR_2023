const displaySettingsService = require('../Services/displaySettingsService');

// Get all display settings
async function getAll(req, res) {
    try {
        const displaySettings = await displaySettingsService.getAll();
        res.status(200).json(displaySettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single display setting by ID
async function getById(req, res) {
    try {
        const displaySettings = await displaySettingsService.getById(req.params.id);
        if (!displaySettings) return res.status(404).json({ message: 'Display settings not found' });
        res.status(200).json(displaySettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new display setting
async function create(req, res) {
    try {
        const displaySettings = await displaySettingsService.create(req.body);
        res.status(201).json(displaySettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an existing display setting
async function update(req, res) {
    try {
        const displaySettings = await displaySettingsService.update(req.params.id, req.body);
        if (!displaySettings) return res.status(404).json({ message: 'Display settings not found' });
        res.status(200).json(displaySettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a display setting by ID
async function deleteById(req, res) {
    try {
        const displaySettings = await displaySettingsService.deleteById(req.params.id);
        if (!displaySettings) return res.status(404).json({ message: 'Display settings not found' });
        res.status(200).json(displaySettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
