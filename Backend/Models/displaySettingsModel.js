const mongoose = require('mongoose');
const PlaylistItem = require('./playlistItemModel');

const displaySettingsSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum: ['image', 'data', 'free', 'loop'],
        required: true,
    },
    loop: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PlaylistItem',
        },
    ], // PlaylistItem is a mongoose model (see playlistItemModel.js)
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const DisplaySettings = mongoose.models.DisplaySettings || mongoose.model('DisplaySettings', displaySettingsSchema);

module.exports = DisplaySettings;
