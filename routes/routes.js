const users = require('../data/users.js');

const router = app => {
    app.get('/', (request, response) => {
        response.status(200).json('HTTP API');
    });

    app.get('/users', (request, response) => {
        response.status(200).json(users);
    });

    app.get('/users/:id', function (request, response) {
        const id = request.params.id;

        const userById = users.filter(user => user.id == id)[0];

        if (!userById) {
            response.sendStatus(404);
        } else {
            response.status(200).json(userById);
        }
    });
}

module.exports = router;