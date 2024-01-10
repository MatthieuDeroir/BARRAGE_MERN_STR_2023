const PlaylistItemRepository = require("../Repositories/playlistItemRepository");

// get all
async function GetAll() {
  return await PlaylistItemRepository.getAll();
}

// get by id
async function GetById(id) {
  return await PlaylistItemRepository.getById(id);
}


// create
async function Create(playlistItem) {
  return PlaylistItemRepository.create(playlistItem);
}

// update
async function Update(id, updatedPlaylistItem) {
  return await PlaylistItemRepository.update(id, updatedPlaylistItem);
}

// delete
async function Delete(id) {
  return await PlaylistItemRepository.deleteById(id);
}

module.exports = {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
};
