const ImageDisplay = require('./imageDisplayComponent');
const DataDisplay = require('./dataDisplayComponent');

class PlaylistManager {
	constructor(playlist) {
		this.playlist = playlist;
		this.currentIndex = 0;
		this.imageDisplay = new ImageDisplay();
		this.dataDisplay = new DataDisplay();
	}

	nextItem() {
		let item = this.playlist[this.currentIndex];
		try {
			if (item.type === 'image') {
				this.imageDisplay.show(item.content);
				this.dataDisplay.hide();
			} else if (item.type === 'data') {
				this.dataDisplay.show(item.content);
				this.imageDisplay.hide();
			} else {
				throw new Error('Invalid playlist item type');
			}
		} catch (error) {
			console.error(error);
		}

		this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
	}
}

module.exports = PlaylistManager;
