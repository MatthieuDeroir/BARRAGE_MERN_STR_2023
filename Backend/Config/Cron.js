const cron = require("node-cron");

// cronJobs.js
const { parseData } = require("./Parser");

const setupCronJobs = () => {
	cron.schedule("0 * * * *", async () => {
		console.log("running a task every hour");
		await parseData();
	});
};

module.exports = setupCronJobs;


