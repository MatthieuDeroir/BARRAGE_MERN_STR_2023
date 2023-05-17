// const express = require('express');
// const mongoose = require('mongoose');
// const DisplaySettings = require('./Models/displaySettingsModel');
// // const bodyparser = require("body-parser");
// // const fileupload = require("express-fileupload");
//
// const cors = require('cors');
//
// // import routes from './routes/appRoutes';
//
//
// const app = express();
// const PORT = 4000;
//
// // disabling mention
// app.disable('x-powered-by')
//
// // mongo connexion
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/BarrageDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
//
//
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
// db.once('open', () => {
//     console.log('Connecté à MongoDB');
// });
//
// app.listen(PORT, () => {
//     console.log(`Serveur Express écoutant sur le port ${PORT}`);
// });
//
// app.get('/', (req, res) =>
//     res.send(`Le serveur fonctionne sur le port : ${PORT}`)
// )
//
// //app routes
// app.use('/users', require('./routes/userRoutes'));
// app.use('/displaySettings', require('./routes/displaySettingsRoutes'));
//
// // Check if the DisplaySettings collection is empty
// DisplaySettings.countDocuments({}, function (err, count) {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }
//
//     if (count === 0) {
//         // Create a new DisplaySettings document
//         const displaySettings = new DisplaySettings({
//             mode: 'free',
//             panel: 0,
//             freeText: {
//                 line1: 'Welcome !',
//                 line2: 'This is the free mode',
//                 line3: 'Configure this text in the Display Settings',
//                 line4: 'Use the Display Settings API to update this document',
//                 line5: 'Thank you for using our app !',
//             },
//         });
//
//         displaySettings.save(function (err) {
//             if (err) {
//                 console.error(err);
//                 process.exit(1);
//             }
//
//             console.log('DisplaySettings document created');
//         });
//     }
// });
//

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DisplaySettings = require('./models/displaySettingsModel');
const userRoutes = require('./routes/userRoutes');
const displaySettingsRoutes = require('./routes/displaySettingsRoutes');
const { initializeDatabase } = require('./Utilities/database');

const app = express();
const PORT = 4000;

// Disable the x-powered-by header to improve security.
app.disable('x-powered-by');

// Connect to MongoDB using Mongoose.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/BarrageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => {
    console.log('Connecté à MongoDB');
});

// Set up middleware.
app.use(cors());
app.use(express.json());

// Set up routes.
app.use('/users', userRoutes);
app.use('/displaySettings', displaySettingsRoutes);

// Initialize the database with a DisplaySettings document if it is empty.
initializeDatabase(mongoose.models['DisplaySettings']);

// Start the server.
app.listen(PORT, () => {
    console.log(`Serveur Express écoutant sur le port ${PORT}`);
});
