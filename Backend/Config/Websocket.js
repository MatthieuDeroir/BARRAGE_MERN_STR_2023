const WebSocket = require("ws");
const { updateClientStatus } = require("../Controllers/DataController");
const { getActiveSlideshows, getSettings, getSlideshowStatus } = require("./Parser");


const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });
console.log("WebSocket server started on port 8080");

const connectedClients = {};

wss.on("connection", (ws) => {
    console.log("A client connected");


    ws.on("message", async (message) => {
        console.log("received: %s", message);
		const ip = ws._socket.remoteAddress;
        const data = JSON.parse(message);

        if (data.type === 'connect') {
            connectedClients[data.id] = { ws, lastHeartbeat: Date.now() };
            console.log(`Client ${data.id} from ip ${ip} connected`);
            await updateClientStatus(data.id, true);
        } else if (data.type === 'disconnect') {
            delete connectedClients[data.id];
            console.log(`Client ${data.id} ip ${ip} disconnected`);
            await updateClientStatus(data.id, false);
        } else if (data.type === 'heartbeat') {
            if (connectedClients[data.id]) {
                connectedClients[data.id].lastHeartbeat = Date.now();
                console.log(`Heartbeat received from ${data.id} ip ${ip}`);
            }
        }
    });

    ws.on("close", async () => {
        const disconnectedClientId = Object.keys(connectedClients).find(clientId => connectedClients[clientId].ws === ws);
        if (disconnectedClientId) {
            delete connectedClients[disconnectedClientId];
            console.log(`Client ${disconnectedClientId} disconnected`);
            await updateClientStatus(disconnectedClientId, false);
        }
    });
});

setInterval(async () => {
	testIfClientIsConnected();
}, 60 * 1000);

const testIfClientIsConnected = async (clientId) => {
	const currentTime = Date.now();
	console.log("Testing if clients are still connected");

    for (const clientId in connectedClients) {
        const client = connectedClients[clientId];
		console.log("Testing client ", clientId);
		console.log("current time : ", currentTime);
		console.log("last heartbeat : ", client.lastHeartbeat);
		console.log("elapsed time since last heartbeat : ", currentTime - client.lastHeartbeat, " s."); 
        if (currentTime - client.lastHeartbeat > 2 * 60 * 1000) {
            console.log(`Client ${clientId} is considered disconnected due to timeout`);
            delete connectedClients[clientId];
            await updateClientStatus(clientId, false);
        }
    }
}

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

const sendActiveSlideshows = async () => {
    const slideshows = await getActiveSlideshows();
    const settings = await getSettings();
    const slideshowStatus = await getSlideshowStatus();
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({type: 'slideshows', slideshows}));
            client.send(JSON.stringify({type: 'settings', settings}));
            client.send(JSON.stringify({type: 'slideshowStatus', slideshowStatus}));
        }
    });
}

// You can adjust the interval or trigger this function based on specific events
setInterval(sendActiveSlideshows, 30000); // For example, every 30 seconds

module.exports = {
    setupWebSocketServer: wss.on.bind(wss, "connection"),
    sendUpdateToAllClients,
    sendToAll,
    sendActiveSlideshows
};
