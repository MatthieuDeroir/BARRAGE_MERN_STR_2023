class DataDisplay {
	constructor() {
		this.dataElement = document.createElement('p');
	}

	show(data) {
		if (typeof data === 'string') {
			this.dataElement.innerText = data;
			document.body.appendChild(this.dataElement);
		} else {
			throw new Error('Invalid data. Expected a string.');
		}
	}

	hide() {
		if (this.dataElement.parentNode) {
			this.dataElement.parentNode.removeChild(this.dataElement);
		}
	}
}

module.exports = DataDisplay;
