const WebSocket = require('ws');
const { startDisplayLoop } = require('./displayLoop');
const config = require('./config');

const ws = new WebSocket(`ws://${config.websocket.ip}:${config.websocket.port}`);

function setupWebSocket() {
    ws.on('open', () => {
        console.log('Connected to WebSocket server');
        ws.send('get_data');
    });

    ws.on('message', (data) => {
        console.log('Received data:', data);
        const displaySettings = JSON.parse(data);
        startDisplayLoop(displaySettings.loop);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('Disconnected from WebSocket server');
    });
}

module.exports = {
    setupWebSocket,
};
