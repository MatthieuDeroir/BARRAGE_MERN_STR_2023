function setupWebsocketClient(onMessageReceived, clientId) {
    const API_URL = process.env.REACT_APP_API_URL;
    const serverUrl = `ws://${API_URL}:8080`;
    const ws = new WebSocket(serverUrl);

    ws.addEventListener('open', function (event) {
        console.log("Connected to the server");
        // Envoyer l'identifiant du client au serveur
        ws.send(JSON.stringify({ type: 'connect', id: clientId }));
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
        ws.close();
    }

    // Exposer la fonction de déconnexion pour un usage externe
    return { disconnect };
}

// Vous pouvez adapter cette partie pour choisir l'identifiant du client correctement
const client = setupWebsocketClient(onMessageReceived, "1"); // Utiliser "1" pour le client 1, "2" pour le client 2

function onMessageReceived(event) {
    const data = JSON.parse(event.data);
    console.log(data);
}
