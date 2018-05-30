const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app);

const server = app.listen(3001, () => {
    console.log(`App running on port ${server.address().port}`);
});

// curl --data "id=3&name=Ben&email=ben@httpchat.dev&username=benizard" http://localhost:3001/users
