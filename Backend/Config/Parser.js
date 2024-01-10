const fs = require("fs");
const Data = require("../Models/DataModel");
const Slideshow = require('../Models/SlideshowModel');
const Media = require('../Models/MediaModel');
const SlideshowStatus = require('../Models/SlideshowStatusModel');

const read = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(process.env.DATA_FILE_PATH, "utf8", (err, dataString) => {
			if (err) {
				console.error(err);
				reject(err);
				return;
			}
			console.log("File read successfully:", dataString);

			// Assuming dataString is in the format "value1,value2,value3"
			const dataValues = dataString.split(",").map(value => value.trim());

			if (dataValues.length !== 3) {
				console.error("Invalid data format");
				reject(new Error("Invalid data format"));
				return;
			}

			// Create an object that matches the Data model structure
			const dataObject = {
				type: "data",
				debit_entrant: dataValues[0],
				debit_sortant: dataValues[1],
				cote_plan_eau: dataValues[2]
			};

			// Create a new instance of the Data model
			Data.findOne().then(existingData => {
				if (existingData) {
					// Update the existing data with new values
					existingData.update(dataObject)
						.then(() => console.log("Data updated successfully"))
						.catch(error => console.error("Error updating data:", error));
				} else {
					// Handle the case where no data exists in the table
					console.error("No existing data found to update");
				}
			}).catch(error => {
				console.error("Error fetching data:", error);
			});
			resolve(JSON.stringify(dataObject));
		});
	});
};


const write = () => {
	const data = "12.345,12.765,23.70";
	console.log(data);

	fs.writeFile(process.env.DATA_FILE_PATH, data, err => {
		if (err) {
			console.error(err);
			return;
		}
		//file written successfully
		console.log("file written successfully");
	});
	read();
};


async function getActiveSlideshows() {
	console.log("Fetching active slideshows...");
	try {
		return await Slideshow.findAll({
			include: [{
				model: Media,
				as: 'media',
			}, {
				model: SlideshowStatus,
				where: { isRunning: true }
			}]
		});
	} catch (error) {
		console.error("Error fetching active slideshows:", error);
		throw error;
	}
}

module.exports = {
	read,
	write,
	getActiveSlideshows
};