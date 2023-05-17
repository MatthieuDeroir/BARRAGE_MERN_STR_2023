const fs = require('fs');
const path = require('path');

class ImageDisplay {
	constructor() {
		this.imageElement = document.createElement('img');
		this.imageElement.style.maxWidth = '100%';
		this.imageElement.style.maxHeight = '100%';
	}

	show(filePath) {
		if (fs.existsSync(filePath) && path.extname(filePath).toLowerCase() === '.jpg') {
			this.imageElement.src = filePath;
			document.body.appendChild(this.imageElement);
		} else {
			throw new Error('Invalid image file path');
		}
	}

	hide() {
		if (this.imageElement.parentNode) {
			this.imageElement.parentNode.removeChild(this.imageElement);
		}
	}
}

module.exports = ImageDisplay;
