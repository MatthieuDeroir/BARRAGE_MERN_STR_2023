const playlistItemService = require("../Services/playlistItemService");

// get all
async function getAll(req, res) {
  try {
    const playlistItems = await playlistItemService.GetAll();
    res.status(200).json(playlistItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get by id
async function getById(req, res) {
  try {
    const playlistItem = await playlistItemService.GetById(req.params.id);
    if (!playlistItem)
      return res.status(404).json({ message: "Playlist item not found" });
    res.status(200).json(playlistItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// create
async function create(req, res) {
  try {
    const playlistItem = await playlistItemService.Create(req.body);
    console.log(req.body);
    res.status(201).json(playlistItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update
async function update(req, res) {
  try {
    const playlistItem = await playlistItemService.Update(
      req.params.id,
      req.body
    );
    if (!playlistItem)
      return res.status(404).json({ message: "Playlist item not found" });
    res.status(200).json(playlistItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// delete
async function deleteById(req, res) {
  try {
    const playlistItem = await playlistItemService.Delete(req.params.id);
    if (!playlistItem)
      return res.status(404).json({ message: "Playlist item not found" });
    res.status(200).json(playlistItem);
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
