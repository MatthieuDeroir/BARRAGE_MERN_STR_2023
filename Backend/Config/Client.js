const WebSocket = require("ws");

// Connect to the WebSocket server
const ws = new WebSocket("ws://localhost:8080");


ws.on("open", function open() {
	console.log("Connected to the server");
	ws.send("Hello, server!");
});


ws.on("message", function incoming(message) {
	try {
		// Attempt to parse the message as JSON
		const result = JSON.parse(message.toString());

		if (result.type === "data") {
			console.log("Data received!");
			console.log("Débit entrant:", result.debit_entrant);
			console.log("Débit sortant:", result.debit_sortant);
			console.log("Côte du plan d'eau:", result.cote_plan_eau);
		} else if (result.type ==="media") {
			console.log("Media received!");
			console.log("Media:", result);
		} else {
			console.log("Received:", message.toString());
		}
	} catch (e) {
		// If an error occurs, the message is not valid JSON
		console.log("Non-JSON message received:", message.toString());
	}
});


ws.on("close", function close() {
	console.log("Disconnected from the server");
});

ws.on("error", function error(error) {
	console.error("WebSocket error:", error);
});



