const users = require('../data/users.js');
const connection = require('../data/config');

const home = `<h1>HTTP API</h1>
<ul>
    <li>GET <a href="/users">/users</a></li>
    <li>GET <a href="/users/1">/users/{id}</a></li>
</ul>`;

const router = app => {
    app.get('/', (request, response) => {
        response.status(200).send(home);
    });

    app.get('/users', (request, response) => {
        response.status(200).json(users);
    });

    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        const userById = users.filter(user => user.id === id)[0];

        if (!userById) {
            response.sendStatus(404);
        } else {
            response.status(200).json(userById);
        }
    });

    app.post('/users', (request, response) => {
        connection.insert('INSERT INTO users SET ?', request.body)
            .then(result => {
                response.send(`User added to database: ${result.insertId}`);
            })
            .catch(error => {
                console.log(error);
            });
    });
}

module.exports = router;