const mysql = require('mysql');
const users = require('../data/users.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node'
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected!");
});

const router = app => {

    app.get('/', (request, response) => {
        response.status(200).json('HTTP API');
    });

    app.get('/users', (request, response) => {
        response.status(200).json(users);
    });

    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        const userById = users.filter(user => user.id == id)[0];

        if (!userById) {
            response.sendStatus(404);
        } else {
            response.status(200).json(userById);
        }
    });

    app.post('/users', (request, response, next) => {
        console.log(request.body);
        connection.query('INSERT INTO users SET ?', request.body,
            function (error, result) {
                if (error) throw error;
                response.send('User added to database with ID: ' + result.insertId);
            }
        );
    });
}

module.exports = router;