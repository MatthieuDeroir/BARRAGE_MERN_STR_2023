require("dotenv").config();

const app = require("./Config/Express"); // Import de l'application Express configurée
const setupCronJobs = require("./Config/Cron"); // Import de la configuration des tâches cron
const sequelize = require("./Database/Sequelize");
const { setupWebSocketServer, sendToAll } = require("./Config/Websocket"); // Import de la configuration du serveur websocket

const init = require("./Database/Init");

async function startServer() {
	try {
		await sequelize.sync({ force: false });
	

		await init();

		setupWebSocketServer();

		setupCronJobs();

		sendToAll("server", "Server is ready");

		const port = process.env.PORT || 4000;
		app.listen(port, () => console.log(`Listening on port ${port}...`));
	} catch (error) {
		console.error("Error during model synchronization or server initialization", error);
	}
}

startServer();


