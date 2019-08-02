// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({message: 'Welcome to the Node.js Express REST API!'});
    });

    // Display all cars
    app.get('/cars', (request, response) => {
        console.log('GET request display all cars');
        pool.query('SELECT * FROM car', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single car by ID
    app.get('/cars/:id', (request, response) => {
        const id = request.params.id;
        console.log('hi from get for an id, id is ' + id);
        pool.query('SELECT * FROM car WHERE id = ?', id, (error, result) => {
            if (error) {
                // throw error;
                response.send(error.message);
            }

            response.send(result);
        });
    });

    // Add a new car
    app.post('/cars', (request, response) => {
        pool.query('INSERT INTO car SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`car added with ID: ${result.insertId}`);
        });
    });

    // Update an existing car
    app.put('/cars/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE cars SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('car updated successfully.');
        });
    });

    // Delete a car
    app.delete('/cars/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM cars WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('car deleted.');
        });
    });
}

// Export the router
module.exports = router;