const Database = require('../data/config');
const users = require('../data/users.js');
const connection = new Database();

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

    app.post('/users', (request, response) => {
        connection.insert('INSERT INTO users SET ?', request.body,
            (error, result) => {
                console.log(result);
                if (error) {
                    console.log(error);
                }   
                response.send('User added to database.');
                console.log('User added to database.');
            }
        );
    });
}

module.exports = router;