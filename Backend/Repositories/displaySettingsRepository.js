const DisplaySettings = require("../Models/displaySettingsModel");

// Get all display settings
async function getAll() {
  return DisplaySettings.find().sort({ createdAt: "desc" });
}

// Get a single display setting by ID
async function getById(id) {
  return DisplaySettings.findById(id);
}

// Get the display setting list with the playlist items populated
async function getDisplaySettingsWithPlaylistItems() {
  const displaySettings = await DisplaySettings.findOne().populate("loop");

  return displaySettings;
}

// Create a new display setting
async function create(displaySettings) {
  const newDisplaySettings = new DisplaySettings(displaySettings);
  return await newDisplaySettings.save();
}

// Update an existing display setting
async function update(id, updatedDisplaySettings) {
  const displaySettings = await DisplaySettings.findById(id);
  if (!displaySettings) throw new Error("Display settings not found");

  Object.assign(displaySettings, updatedDisplaySettings);
  displaySettings.updatedAt = Date.now();

  return displaySettings.save();
}

// Delete a display setting by ID
async function deleteById(id) {
  return DisplaySettings.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  getDisplaySettingsWithPlaylistItems,
  create,
  update,
  deleteById,
};
