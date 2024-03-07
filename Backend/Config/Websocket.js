const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server started on port 8080");

const connectedClients = {};

wss.on("connection", (ws) => {
    console.log("A client connected");

    ws.on("message", async (message) => {
        console.log("Received: %s", message);
        const data = JSON.parse(message);
        
        if (data.type === 'connect') {
            // Enregistrer le client comme connecté
            connectedClients[data.id] = ws;
            console.log(`Client ${data.id} connected`);
			await updateClientStatus(data.id, true); // Implémentez cette fonction dans votre contrôleur
            
            // Envoyer la mise à jour de l'état de connexion à tous les clients
            updateClientsStatus();
        } else if (data.type === 'disconnect') {
            // Supprimer le client de la liste des connectés
            delete connectedClients[data.id];
            console.log(`Client ${data.id} disconnected`);

			await updateClientStatus(data.id, false); // Implémentez cette fonction dans votre contrôleur
            
            // Envoyer la mise à jour de l'état de connexion à tous les clients
            updateClientsStatus();
        }
    });

    ws.on("close", () => {
        // Trouver et supprimer le client déconnecté
        Object.keys(connectedClients).forEach( async clientId => {
            if (connectedClients[clientId] === ws) {
                delete connectedClients[clientId];
                console.log(`Client ${clientId} disconnected`);

				await DataController.updateClientStatus(clientId, false);
            }
        });
        updateClientsStatus();
    });

    ws.send("Welcome to the WebSocket server!");
});

function updateClientsStatus() {
    const connectedIds = Object.keys(connectedClients);
    const message = JSON.stringify({ type: 'statusUpdate', connectedIds });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}
