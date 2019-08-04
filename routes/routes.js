// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({message: 'Welcome to the Lisa Copeland buy_order REST API Server!'});
    });

    // Display all cars
    app.get('/buyorders', (request, response) => {
        console.log('GET request display all Buy Orders');
        pool.query('SELECT * FROM buy_order', (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));
            if (error) {
                console.log('error sending error message ' + error.message);
                response.status(400).send({ error: "error" });
            } else {
                response.send(result);
            }

        }, error => {
            console.log('error : ' + error.message);
            response.status(400).send({ error: "error" });
        });
    });

    // Display a single car by ID
    app.get('/buyorder/:id', (request, response) => {
        const id = request.params.id;
        console.log('GET request for id : ' + id);        
        pool.query('SELECT * FROM buy_order WHERE id = ?', id, (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));
            if (error) {
                // throw error;
                console.log('error sending error message ' + error.message);
                response.status(400).send({ error : "error" });
            }
            if (result.length === 0) {
                response.status(400).send({ error: "Bad request" });
            } else {
                response.status(200).send(result);
            }
        }, error => {
            console.log('error : ' + error.message);
            response.status(400).send({ error: "error" });
        });
    });

    // Add a new car
    app.post('/buyorder', (request, response) => {
        console.log('POST request, body : ' + JSON.stringify(request.body));
        pool.query('INSERT INTO buy_order SET ?', request.body, (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));        
            if (error) {
                response.status(400).send({ error: "error" });
            } else {
                const body = {
                    message: `buy_order added with ID: ${result.insertId}`,
                    id: result.inserId
                }
                response.status(201).send(body);
            }
        }, error => {
            console.log('error : ' + error.message);
            response.status(400).send({ error: "error" });
        });
    });

    // Update an existing car
    app.put('/buyorder/:id', (request, response) => {
        const id = request.params.id;
        console.log('PUT request for id ' + id);
        pool.query('UPDATE buy_order SET ? WHERE id = ?', [request.body, id], (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));
            if (error) {
                response.status(400).send({ error: "error" });
            } else {
                response.status(200).send({ message: "success" });
            }
        }, error => {
            console.log("error : " + error.message);
            response.status(400).send({ error: "error" });
        });
    });

    // Delete a car
    app.delete('/buyorder/:id', (request, response) => {
        console.log('params = ' + request.params);
        const id = request.params.id;
        console.log('DELETE request for id ' + id);
        pool.query('DELETE FROM buy_order WHERE id = ?', id, (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));
            if (error) {
                response.status(400).send({ error: error.message });
            } else {
                response.status(200).send('success');
            }
        }, error => {
            console.log('error : ' + error.message);
            response.status(400).send({ error: error.message });
        });
    });
}

// Export the router
module.exports = router;