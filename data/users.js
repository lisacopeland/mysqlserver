const connection = require('./config');

let users = [];

connection.select('SELECT * FROM users').then(rows => {
    rows.forEach(user => {
        users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        });
    });
});

module.exports = users;