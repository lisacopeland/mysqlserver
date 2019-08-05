// Require packages
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();

// Set the port
const port = 3002;

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors());

// Route the API
routes(app);

// Start the server
const server = app.listen(port, () => {
    console.log(`App running on port ${server.address().port}`);
});
