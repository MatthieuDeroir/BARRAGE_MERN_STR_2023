const WebSocket = require("ws");
const { getActiveSlideshows, getSettings, getSlideshowStatus } = require("./Parser");
// Suppose que `updateClientStatus` est défini dans ce fichier ou importé d'un contrôleur
const { updateClientStatus } = require("../Controllers/DataController");

const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });
console.log("WebSocket server started on port 8080");

const connectedClients = {};

const setupWebSocketServer = () => {
    wss.on("connection", (ws) => {
        console.log("A client connected");
		const ip = ws._socket.remoteAddress;

        ws.on("message", async (message) => {
            console.log("received: %s", message);
            const data = JSON.parse(message);

            if (data.type === 'connect') {
                connectedClients[data.id] = ws;
                console.log(`Client ${data.id} connected`);
                await updateClientStatus(data.id, true);
				console.log('IP: ' + ip);
                sendUpdateToAllClients();
            } else if (data.type === 'disconnect') {
                delete connectedClients[data.id];
                console.log(`Client ${data.id} disconnected`);
                await updateClientStatus(data.id, false);
				console.log('IP: ' + ip);
                sendUpdateToAllClients();
            } else {
                // Gérer d'autres types de messages ici
                // Par exemple, écho du message reçu pour des tests simples
                ws.send("Echo: " + message);
            }
		

        });

        ws.on("close", async () => {
            const disconnectedClientId = Object.keys(connectedClients).find(clientId => connectedClients[clientId] === ws);
            if (disconnectedClientId) {
                delete connectedClients[disconnectedClientId];
                console.log(`Client ${disconnectedClientId} disconnected`);
                await updateClientStatus(disconnectedClientId, false);
            }
            sendUpdateToAllClients();
        });

    });
};

const sendUpdateToAllClients = () => {
    const connectedIds = Object.keys(connectedClients);
    const message = JSON.stringify({ type: 'statusUpdate', connectedIds });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

const sendToAll = (message) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

async function sendActiveSlideshows() {
    const slideshows = await getActiveSlideshows();
    const settings = await getSettings();
    const slideshowStatus = await getSlideshowStatus();
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({type: 'slideshows', slideshows}));
            client.send(JSON.stringify({type: 'settings', settings}));
            client.send(JSON.stringify({type: 'slideshowStatus', slideshowStatus}));
        }
    });
}

// You can call this function periodically or trigger it based on some events
setInterval(sendActiveSlideshows, 30000); // For example, every 30 seconds


module.exports = {
    setupWebSocketServer,
    sendUpdateToAllClients,
	sendToAll
};
