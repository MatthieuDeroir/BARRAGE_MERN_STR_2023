const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

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

const PlaylistManager = require('./Components/Display/playlistManager');

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

ipcMain.handle('get-next-item', (event) => {
    return playlistManager.nextItem();
});
