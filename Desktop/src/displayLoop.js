const dataDisplayComponent = require('./Components/Display/dataDisplayComponent');
const imageDisplayComponent = require('./Components/Display/imageDisplayComponent');
const textDisplayComponent = require('./Components/Display/textDisplayComponent');

let newMessageReceived = false;

async function startDisplayLoop(loop) {
    do {
        for (const content of loop) {
            if (newMessageReceived) {
                newMessageReceived = false;
                break;
            }

            if (content.type === 'image') {
                await imageDisplayComponent(content);
            } else if (content.type === 'free') {
                await textDisplayComponent(content);
            } else if (content.type === 'data') {
                await dataDisplayComponent(content);
            }

            await sleep(content.duration * 1000);
        }
    } while (!newMessageReceived);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
    startDisplayLoop,
};