const mysql = require('mysql');

let users = [];

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

connection.query('SELECT * FROM users', function (error, results) {
    if (error) throw error;

    results.forEach(user => {
        users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username
        });
    });
});

connection.end();

module.exports = users;