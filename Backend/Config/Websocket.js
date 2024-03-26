const WebSocket = require("ws");
const { updateClientStatus } = require("../Controllers/DataController");
const { getActiveSlideshows, getSettings, getSlideshowStatus } = require("./Parser");

let wss;
const connectedClients = {};

function setupWebSocketServer() {
    wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });
    console.log("WebSocket server started on port 8080");

    wss.on("connection", (ws) => {
        console.log("A client connected");
        const ip = ws._socket.remoteAddress;

        ws.on("message", async (message) => {
            console.log("received: %s", message);
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

    // Définition d'intervalles pour les vérifications périodiques
    setInterval(checkClientsConnection, 60000);
    setInterval(sendActiveSlideshows, 30000);
}

function checkClientsConnection() {
    const currentTime = Date.now();
    console.log("Testing if clients are still connected");
    Object.keys(connectedClients).forEach(async (clientId) => {
        const client = connectedClients[clientId];
        if (currentTime - client.lastHeartbeat > 90 * 1000) { // 90 seconds
            console.log(`Client ${clientId} is considered disconnected due to timeout`);
            delete connectedClients[clientId];
            await updateClientStatus(clientId, false);
        }
    });
}

function sendUpdateToAllClients() {
    const connectedIds = Object.keys(connectedClients);
    const message = JSON.stringify({ type: 'statusUpdate', connectedIds });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function sendToAll(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

async function sendActiveSlideshows() {
    const slideshows = await getActiveSlideshows();
    const settings = await getSettings();
    const slideshowStatus = await getSlideshowStatus();
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({type: 'slideshows', slideshows}));
            client.send(JSON.stringify({type: 'settings', settings}));
            client.send(JSON.stringify({type: 'slideshowStatus', slideshowStatus}));
        }
    });
}

module.exports = {
    setupWebSocketServer,
    sendUpdateToAllClients,
    sendToAll,
    sendActiveSlideshows
};
