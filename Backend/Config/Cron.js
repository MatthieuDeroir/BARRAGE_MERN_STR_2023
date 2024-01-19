const cron = require("node-cron");

// cronJobs.js
const { read, write } = require("./Parser");
const { sendToAll, sendActiveSlideshow } = require("./Websocket");

const setupCronJobs = () => {
	cron.schedule("*/5 * * * * *", async () => {
		
		const parseData = async () => {
			console.log("Parsing data");
			try {
				const dataString = await read(); // Assuming read returns a Promise
				sendToAll(dataString);
			} catch (error) {
				console.error("Error parsing data:", error);
			}
		};
		parseData();
	});
	cron.schedule("*/5 * * * * *", async () => {
		
		sendActiveSlideshow();
	});

};

module.exports = setupCronJobs;


