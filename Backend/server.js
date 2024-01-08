require("dotenv").config();

const app = require("./Config/Express"); // Import de l'application Express configurée
const setupCronJobs = require("./Config/Cron"); // Import de la configuration des tâches cron
const sequelize = require("./Database/Sequelize");

const init = require("./Database/Init");

async function startServer() {
	try {
		await sequelize.sync({ force: false });
		console.log("All models were synchronized successfully.");

		await init();

		setupCronJobs();

		const port = process.env.PORT || 4000;
		app.listen(port, () => console.log(`Listening on port ${port}...`));
	} catch (error) {
		console.error("Error during model synchronization or server initialization", error);
	}
}

startServer();


