const {initializeDatas} = require('../Controllers/DataController');
const {initializeSettings} = require('../Controllers/SettingsController');
const {initializeSlideshowStatus} = require('../Controllers/SlideshowStatusController');

function initialize() {
    try {
        initializeDatas();
        initializeSettings();
        initializeSlideshowStatus();
    } catch (error) {
        console.error('Error while initializing', error);
    }
}

module.exports = initialize;
