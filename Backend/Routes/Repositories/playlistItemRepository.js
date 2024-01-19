const PlaylistItem = require("../Models/playlistItemModel");

// Get all playlist items
async function getAll() {
  return PlaylistItem.find().sort({ createdAt: "desc" });
}

// Get a single playlist item by ID
async function getById(id) {
  return PlaylistItem.findById(id);
}

// Create a new playlist item
// Create a new playlist item
async function create(playlistItem) {
  console.log("Creating playlist item:", playlistItem);

  const newPlaylistItem = new PlaylistItem(playlistItem);

  try {
    const savedItem = await newPlaylistItem.save();
    return savedItem;
  } catch (error) {
    console.error("Error saving playlist item:", error);
    throw error;
  }
}

// Update an existing playlist item
async function update(id, updatedPlaylistItem) {
  const playlistItem = await PlaylistItem.findById(id);
  if (!playlistItem) throw new Error("Playlist item not found\nID: " + id);

  Object.assign(playlistItem, updatedPlaylistItem);

  return playlistItem.save();
}

//Delete playlist item

async function deleteById(id) {
  try {
    const deletedItem = await PlaylistItem.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new Error(`Item with id: ${id} not found`);
    }

    return deletedItem;
  } catch (err) {
    // Handle the error here. You might want to log it or re-throw it.
    console.error(`Error deleting item with id: ${id}. Error: ${err}`);
    throw err;
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
