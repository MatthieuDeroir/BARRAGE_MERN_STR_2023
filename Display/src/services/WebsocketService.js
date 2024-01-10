function setupWebsocketClient(onMessageReceived) {
	// Create a new WebSocket connection
	const ws = new WebSocket("ws://localhost:8080");

	// Connection opened
	ws.addEventListener('open', function (event) {
		console.log("Connected to the server");
		ws.send("Hello, server!");
	});

	// Listen for messages
	ws.addEventListener('message', function (event) {
		try {
			// Attempt to parse the message as JSON
			onMessageReceived(event);
		} catch (e) {
			// If an error occurs, the message is not valid JSON
			console.log("Non-JSON message received:", event.data);
		}
	});

	// Handle any errors that occur
	ws.addEventListener('error', function (event) {
		console.error("WebSocket error observed:", event);
	});

	// Connection closed
	ws.addEventListener('close', function (event) {
		console.log("Disconnected from the server");
	});
}

// You can call this function to set up the WebSocket client
module.exports = setupWebsocketClient;
