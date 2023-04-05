const mongoose = require('mongoose');

const playlistItemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'data', 'free'],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    content: {
        image: {
            filePath: String,
            resolution: {
                width: Number,
                height: Number,
            },
        },
        data: {
            dataSource: String,
            query: String,
        },
        freeText: {
            line1: String,
            line2: String,
            line3: String,
            line4: String,
            line5: String,
        },
    },
});

const PlaylistItem = mongoose.model('PlaylistItem', playlistItemSchema);

module.exports = PlaylistItem;