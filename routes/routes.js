// Load the MySQL pool connection
const pool = require('../data/config');
const cors = require('cors');

const whitelist = [
    'http://localhost:4200',
    'http://localhost:3002'
];

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', cors(corsOptionsDelegate), (request, response) => {
        response.send({message: 'Welcome to the Lisa Copeland buy_order REST API Server!'});
    });

    // Initialize Database Table
    app.get('/initialize', cors(corsOptionsDelegate), (request, response) => {
        console.log('Ensure that all elements are present in database');
        const createBuyOrder = `create table if not exists buy_order(
                          id int primary key auto_increment,
                          name varchar(255) not null,
                          max_bid_price decimal(10,2) not null default 0,
                          data_package_type enum("Device Location", "Device Behavior", "ID Mapping") not null
                          );`;
        pool.query(createBuyOrder, (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));
            if (error) {
                console.log('error sending error message ' + error.message);
                response.status(400).send({ error: "error" });
            } else {
                response.status(200).send({ message: "success" });
            }
        }, error => {
            console.log('error : ' + error.message);
            response.status(400).send({ error: "error" });
        });
    });

    // Display all buyorders
    app.get('/buyorders', cors(corsOptionsDelegate), (request, response) => {
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

    // Display a single buyorder by ID
    app.get('/buyorder/:id', cors(corsOptionsDelegate), (request, response) => {
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

    // Add a new buyorder
    app.post('/buyorder', cors(corsOptionsDelegate), (request, response) => {
        console.log('POST request, body : ' + JSON.stringify(request.body));
        pool.query('INSERT INTO buy_order SET ?', request.body, (error, result) => {
            console.log('result from query : ' + JSON.stringify(result));        
            if (error) {
                response.status(400).send({ error: "error" });
            } else {
                const body = {
                    message: `buy_order added with ID: ${result.insertId}`,
                    id: result.insertId
                }
                response.status(201).send(body);
            }
        }, error => {
            console.log('error : ' + error.message);
            response.status(400).send({ error: "error" });
        });
    });

    // Update an existing buyorder
    app.put('/buyorder/:id', cors(corsOptionsDelegate), (request, response) => {
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

    // Delete a buyorder
    app.delete('/buyorder/:id', cors(corsOptionsDelegate), (request, response) => {
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