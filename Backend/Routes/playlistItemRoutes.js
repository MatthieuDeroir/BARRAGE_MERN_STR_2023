const express = require("express");
const playlistItemController = require("../Controllers/playlistItemController");

const router = express.Router();

// Get all playlist items
router.get("/", playlistItemController.getAll);

// Get a single playlist item by ID
router.get("/:id", playlistItemController.getById);

// Create a new playlist item
router.post("/", playlistItemController.create);

// Update an existing playlist item
router.put("/:id", playlistItemController.update);

// Delete a playlist item by ID
router.delete("/:id", playlistItemController.deleteById);

module.exports = router;
