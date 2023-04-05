const DisplaySettings = require('../Models/displaySettingsModel');

// Get all display settings
async function getAll() {
    return await DisplaySettings.find().sort({createdAt: 'desc'});
}

// Get a single display setting by ID
async function getById(id) {
    return await DisplaySettings.findById(id);
}

// Create a new display setting
async function create(displaySettings) {
    const newDisplaySettings = new DisplaySettings(displaySettings);
    return await newDisplaySettings.save();
}

// Update an existing display setting
async function update(id, updatedDisplaySettings) {
    const displaySettings = await DisplaySettings.findById(id);
    if (!displaySettings) throw new Error('Display settings not found');

    Object.assign(displaySettings, updatedDisplaySettings);
    displaySettings.updatedAt = Date.now();

    return await displaySettings.save();
}

// Delete a display setting by ID
async function deleteById(id) {
    return await DisplaySettings.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
