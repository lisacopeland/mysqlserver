const connection = require('../data/config');

const router = app => {
    app.get('/', function (request, response) {
        response.status(200).json('Node.js Express REST API');
    });

    app.get('/users', function (request, response) {
        connection.query('SELECT * FROM users', function (error, result) {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/users/:id', function (request, response) {
        const id = request.params.id;

        connection.query('SELECT * FROM users WHERE id = ?', id, function (error, result) {
            if (error) throw error;

            response.send(result);
        });
    });

    app.post('/users', (request, response) => {
        connection.query('INSERT INTO users SET ?', request.body, function (error, result) {
            if (error) throw error;

            response.send(`User added with ID: ${result.insertId}`);
        });
    });

    app.put('/users/:id', function (request, response) {
        const id = request.params.id;

        connection.query('UPDATE users SET ? WHERE id = ?', [request.body, id], function (error, result) {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    app.delete('/users/:id', function (request, response) {
        const id = request.params.id;

        connection.query('DELETE FROM users WHERE id = ?', id, function (error, result) {
            if (error) throw error;

            response.send('User deleted.');
        });
    });
}

module.exports = router;