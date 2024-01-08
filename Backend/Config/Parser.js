const fs = require('fs');
const Data = require("../Models/DataModel");

fs.readFile(process.env.DATA_FILE_PATH, 'utf8' , (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	console.log(data)

	const dataObj = JSON.parse(data);

	const dataSQL = Data.create(dataObj);

	console.log(dataSQL);
})


fs.writeFile(process.env.DATA_FILE_PATH, JSON.stringify("data"), err => {
	if (err) {
		console.error(err)
		return
	}
	//file written successfully
})