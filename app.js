const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const app = express();

const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

const server = app.listen(port, () => {
    console.log(`App running on port ${server.address().port}`);
});