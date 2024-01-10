const displaySettingsRepository = require("../Repositories/displaySettingsRepository");

// Get all display settings
async function getAll() {
  return await displaySettingsRepository.getAll();
}

// Get a single display setting by ID
async function getById(id) {
  return await displaySettingsRepository.getById(id);
}

// Get the display setting list with the playlist items populated
async function getDisplaySettingsWithPlaylistItems() {
  return await displaySettingsRepository.getDisplaySettingsWithPlaylistItems();
}

// Create a new display setting
async function create(displaySettings) {
  return await displaySettingsRepository.create(displaySettings);
}

// Update an existing display setting
async function update(id, updatedDisplaySettings) {
  return await displaySettingsRepository.update(id, updatedDisplaySettings);
}

// Delete a display setting by ID
async function deleteById(id) {
  return await displaySettingsRepository.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  getDisplaySettingsWithPlaylistItems,
  create,
  update,
  deleteById,
};
