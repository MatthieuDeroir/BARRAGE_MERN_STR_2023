const WebSocket = require("ws");
const { getActiveSlideshows } = require("./Parser");

const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server started on port 8080");

const setupWebSocketServer = () => {
	wss.on("connection", (ws) => {
		console.log("A client connected");

		ws.on("message", (message) => {
			console.log("received: %s", message);
			// Optionally, echo the message back to the client
			ws.send("Echo: " + message);
		});

		ws.on("close", () => {
			console.log("A client disconnected");
		});

		// Send a welcome message to the newly connected client
		ws.send("Welcome to the WebSocket server!");
	});
};

const sendToAll = (message) => {
	console.log("Sending message to all clients: " + message);
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

async function sendActiveSlideshows() {
	console.log("Sending active slideshows to all clients");
	const slideshows = await getActiveSlideshows();
	console.log(JSON.stringify(slideshows));
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(slideshows));
		}
	});
}

// You can call this function periodically or trigger it based on some events
setInterval(sendActiveSlideshows, 30000); // For example, every 30 seconds


module.exports = {
	setupWebSocketServer,
	sendToAll
};
