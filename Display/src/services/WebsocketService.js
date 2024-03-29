function setupWebsocketClient(onMessageReceived, clientId) {
    const API_URL = process.env.REACT_APP_API_URL;
    const serverUrl = `ws://88.123.138.131:16387`;
    const ws = new WebSocket(serverUrl);

    ws.addEventListener('open', function (event) {
        console.log("Connected to the server");
        // Envoyer l'identifiant du client au serveur
        ws.send(JSON.stringify({ type: 'connect', id: clientId }));
        let heartbeatInterval = setInterval(() => {
            const timestamp = Date.now(); // Obtenir le timestamp actuel
            ws.send(JSON.stringify({ type: 'heartbeat', id: clientId, timestamp }));
            console.log("Heartbeat sent", { clientId, timestamp });
        }, 60000); // 60000 ms = 1 minute
    });

    ws.addEventListener('message', function (event) {
        onMessageReceived(event);
    });

    ws.addEventListener('close', function (event) {
        console.log("Disconnected from the server");
        setTimeout(() => setupWebsocketClient(onMessageReceived, clientId), 1000);
    });

    ws.addEventListener('error', function (event) {
        console.error("WebSocket error observed:", event);
    });

    // Envoyer un message de déconnexion avant de fermer la connexion
    function disconnect() {
        ws.send(JSON.stringify({ type: 'disconnect', id: clientId }));
    }


    // Exposer la fonction de déconnexion pour un usage externe
    return { disconnect };
}

// Vous pouvez adapter cette partie pour choisir l'identifiant du client correctement
const client = setupWebsocketClient(onMessageReceived, process.env.REACT_APP_CLIENT_ID); // Utiliser "1" pour le client 1, "2" pour le client 2
function onMessageReceived(event) {
    try {
        const data = JSON.parse(event.data);
        console.log(data);
    } catch (error) {
        console.error('Erreur lors du parsing JSON:', error);
    }
}


exports.setupWebsocketClient = setupWebsocketClient;