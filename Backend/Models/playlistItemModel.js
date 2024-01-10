const mongoose = require("mongoose");

const playlistItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "data"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  content: {
    image: {
      filePath: {
        type: String,
        validate: {
          validator: function () {
            return this.type === "image";
          },
          message: 'filePath is required when type is "image"',
        },
      },
      resolution: {
        width: Number,
        height: Number,
      },
    },
    data: {
      dataSource: {
        type: String,
        validate: {
          validator: function () {
            return this.type === "data";
          },
          message: 'dataSource is required when type is "data"',
        },
      },
      query: String,
    },
  },
});

playlistItemSchema.post("save", async function () {
  const DisplaySettings = require("./displaySettingsModel");
  const displaySettings = await DisplaySettings.findOne(); // assuming only one document exists

  // Add the new playlist item to the loop
  displaySettings.loop.push(this._id);

  // Update the updatedAt field
  displaySettings.updatedAt = new Date();

  // Save the updated DisplaySettings document
  await displaySettings.save();
});

playlistItemSchema.post("findOneAndDelete", async function (doc) {
  const DisplaySettings = require("./displaySettingsModel");
  const displaySettings = await DisplaySettings.findOne(); // assuming only one document exists

  if (!displaySettings) {
    throw new Error("No display settings found");
  }

  // Remove the deleted playlist item from the loop
  const index = displaySettings.loop.indexOf(doc._id.toString());
  if (index > -1) {
    displaySettings.loop.splice(index, 1);
  }
  // Update the updatedAt field
  displaySettings.updatedAt = new Date();

  // Save the updated DisplaySettings document
  await displaySettings.save();
});

const PlaylistItem = mongoose.model("PlaylistItem", playlistItemSchema);
module.exports = PlaylistItem;
