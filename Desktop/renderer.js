const { ipcRenderer } = require('electron');

ipcRenderer.invoke('get-next-item').then((item) => {
	// Check the type of the item and handle it appropriately
	if (item.type === 'image') {
		// Create an img element and set its src to the file path
		let img = document.createElement('img');
		img.src = item.content;
		document.body.appendChild(img);
	} else if (item.type === 'data') {
		// Create a p element and set its innerText to the data
		let p = document.createElement('p');
		p.innerText = item.content;
		document.body.appendChild(p);
	}
});
