const { app, BrowserWindow } = require('electron');
const { setupWebSocket } = require('./websocket');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    setupWebSocket();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const PlaylistManager = require('./Components/PlaylistManager');

let playlist = [
    { type: 'image', content: 'path/to/image1.jpg' },
    { type: 'data', content: 'Hello, Electron!' },
    // Add more items as needed
];

let playlistManager = new PlaylistManager(playlist);

// Display the first item immediately
playlistManager.nextItem();

// Then cycle through the playlist every 5 seconds
setInterval(() => {
    playlistManager.nextItem();
}, 5000);

