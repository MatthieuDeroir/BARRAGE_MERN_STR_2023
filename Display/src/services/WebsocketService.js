function setupWebsocketClient(onMessageReceived) {
    // Définir l'URL du serveur WebSocket
    const serverUrl = "ws://localhost:8080";
    
    // Fonction pour créer une nouvelle connexion WebSocket
    function connect() {
        // Créer une nouvelle connexion WebSocket
        const ws = new WebSocket(serverUrl);

        // Connexion ouverte
        ws.addEventListener('open', function (event) {
            console.log("Connected to the server");
            ws.send("Hello, server!");
        });

        // Écouter les messages
        ws.addEventListener('message', function (event) {
            try {
                // Tenter de parser le message comme JSON
                onMessageReceived(event);
            } catch (e) {
                // Si une erreur se produit, le message n'est pas un JSON valide
                console.log("Non-JSON message received:", event.data);
            }
        });

        // Gérer les erreurs
        ws.addEventListener('error', function (event) {
            console.error("WebSocket error observed:", event);
        });

        // Connexion fermée
        ws.addEventListener('close', function (event) {
            console.log("Disconnected from the server");
            // Tenter de se reconnecter après un délai
            setTimeout(connect, 1000); // Reconnexion après 1 seconde
        });

        return ws;
    }

    // Établir la première connexion
    return connect();
}

// Vous pouvez appeler cette fonction pour configurer le client WebSocket
module.exports = setupWebsocketClient;